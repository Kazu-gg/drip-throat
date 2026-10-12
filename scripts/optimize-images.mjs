#!/usr/bin/env node
/**
 * Optimizes images for the site.
 * Drop raw JPG/PNG in uploads/images/<slot>/ then run npm run optimize-images.
 * Optimized WebP + JPG are written to public/images/ (what the site loads).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const UPLOAD_ROOT = path.join(ROOT, "uploads", "images");
const OUTPUT_ROOT = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(ROOT, "src", "lib", "generated", "optimized-images.json");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const PRESETS = {
  hero: { width: 1920, height: 1080, webpQuality: 95, jpegQuality: 95, fit: "inside" },
  collection: { width: 1200, height: 1600, webpQuality: 80, jpegQuality: 82, fit: "cover" },
  product: { width: 1000, height: 1333, webpQuality: 80, jpegQuality: 82, fit: "cover" },
  blog: { width: 1200, height: 800, webpQuality: 80, jpegQuality: 82, fit: "cover" },
  lookbook: { width: 1200, height: 1500, webpQuality: 80, jpegQuality: 82, fit: "cover" },
};

/**
 * Category page heroes — upload folder name matches what it is for.
 * Output still goes to public/images/collections/<gender>/hero/ for the site URLs.
 */
const CATEGORY_PAGE_HEROES = [
  {
    upload: "hero-women",
    output: "collections/women/hero",
    key: "category-hero:women",
    legacyUploads: ["collections/women/hero"],
  },
  {
    upload: "hero-men",
    output: "collections/men/hero",
    key: "category-hero:men",
    legacyUploads: ["collections/men/hero"],
  },
  {
    upload: "hero-unisex",
    output: "collections/unisex/hero",
    key: "category-hero:unisex",
    legacyUploads: ["collections/unisex/hero"],
  },
];

const HOMEPAGE_HERO = {
  upload: "hero-home",
  output: "hero",
  key: "hero",
  legacyUploads: ["hero"],
};

/**
 * Homepage Explore cards — same layout as unisex:
 * portrait main.webp at public/images/collections/<gender>/
 * (separate from public/images/collections/<gender>/hero/ page banner)
 */
const WORLD_CARDS = [
  {
    upload: "card-women",
    output: "collections/women",
    key: "category-card:women",
    legacyUploads: ["collections/women"],
  },
  {
    upload: "card-men",
    output: "collections/men",
    key: "category-card:men",
    legacyUploads: ["collections/men"],
  },
  {
    upload: "card-unisex",
    output: "collections/unisex",
    key: "category:unisex",
    legacyUploads: ["collections/unisex"],
  },
];

/** Map upload folder → manifest key (subcategory + product slots) */
const SLOT_KEYS = {
  "collections/women/sarees": "category:sarees",
  "collections/women/lehengas": "category:lehengas",
  "collections/women/kurti-corset": "category:kurti-corset",
  "collections/women/co-ord-set": "category:co-ord-set",
  "collections/women/suit": "category:suit",
  "collections/women/shirts-tshirt": "category:shirts-tshirt",
  "collections/men/kurtas": "category:kurtas",
  "collections/men/men-shirts": "category:men-shirts",
  "collections/men/men-tshirts": "category:men-tshirts",
  "collections/men/jeans": "category:jeans",
  "collections/men/pants": "category:pants",
  "collections/men/jackets": "category:jackets",
  "collections/accessories/handbags": "category:handbags",
  "collections/accessories/jewellery": "category:jewellery",
  "collections/accessories/watches": "category:watches",
  "collections/accessories/sunglasses": "category:sunglasses",
  "collections/accessories/wallets": "category:wallets",
  "collections/accessories/belts": "category:belts",
  "products/midnight-silk-saree": "product:midnight-silk-saree",
  "products/royal-embroidered-lehenga": "product:royal-embroidered-lehenga",
  "products/ivory-anarkali-suit": "product:ivory-anarkali-suit",
  "products/champagne-co-ord-set": "product:champagne-co-ord-set",
  "products/ivory-silk-shirt": "product:ivory-silk-shirt",
  "products/golden-zari-kurti": "product:golden-zari-kurti",
};

const SKIP_UPLOAD_DIRS = new Set([
  "hero-women",
  "hero-men",
  "hero-unisex",
  "hero-home",
  "card-women",
  "card-men",
  "card-unisex",
  "hero",
  "worlds",
]);

const OPTIMIZED_BASENAMES = /^main\.|^card\./i;

function isRawSourceFile(name) {
  if (name.startsWith(".")) return false;
  const ext = path.extname(name).toLowerCase();
  if (!IMAGE_EXT.has(ext)) return false;
  return !OPTIMIZED_BASENAMES.test(name);
}

async function listRawSources(slotDir) {
  const entries = await fs.readdir(slotDir, { withFileTypes: true }).catch(() => []);
  return entries
    .filter((e) => e.isFile() && isRawSourceFile(e.name))
    .map((e) => e.name)
    .sort();
}

async function pickSourceFromUploads(uploadRelDirs, labelSuffix = "") {
  for (const rel of uploadRelDirs) {
    const uploadDir = path.join(UPLOAD_ROOT, rel);
    const uploadImages = await listRawSources(uploadDir);
    if (uploadImages.length === 0) continue;
    const name = uploadImages[uploadImages.length - 1];
    return { path: path.join(uploadDir, name), label: `${name} ← uploads/${rel}${labelSuffix}` };
  }
  return null;
}

async function pickSource(slot) {
  const primary = await pickSourceFromUploads([slot.upload, ...slot.legacyUploads]);
  if (primary) return primary;

  if (!slot.fallback) return null;

  return pickSourceFromUploads(
    [slot.fallback.upload, ...(slot.fallback.legacyUploads ?? [])],
    " (card ← hero upload)"
  );
}

async function walkSlotDirs(dir, base = "", skipDirNames = []) {
  const slots = [];
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);

  const hasImage = entries.some(
    (e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase())
  );

  if (hasImage && base && !SKIP_UPLOAD_DIRS.has(base.split("/")[0])) {
    const isLegacyHero =
      base.endsWith("/hero") &&
      (base.startsWith("collections/women/") ||
        base.startsWith("collections/men/") ||
        base.startsWith("collections/unisex/"));
    const isLegacyCardRoot =
      base === "collections/unisex" ||
      base === "collections/women" ||
      base === "collections/men";
    if (!isLegacyHero && !isLegacyCardRoot && base !== "hero") {
      slots.push(base);
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith(".")) continue;
    if (skipDirNames.includes(entry.name)) continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    slots.push(...(await walkSlotDirs(path.join(dir, entry.name), rel, skipDirNames)));
  }

  return slots;
}

async function optimizeOne(outputDir, sourcePath, preset) {
  const outDir = path.join(OUTPUT_ROOT, outputDir);
  await fs.mkdir(outDir, { recursive: true });

  const pipeline = sharp(sourcePath)
    .rotate()
    .resize(preset.width, preset.height, {
      fit: preset.fit ?? "cover",
      position: preset.fit === "cover" ? "centre" : undefined,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.8, m1: 0.5, m2: 2.0 });

  const webpPath = path.join(outDir, "main.webp");
  const jpegPath = path.join(outDir, "main.jpg");

  const webpBuffer = await pipeline.clone().webp({ quality: preset.webpQuality }).toBuffer();
  const jpegBuffer = await pipeline
    .clone()
    .jpeg({ quality: preset.jpegQuality, mozjpeg: true })
    .toBuffer();

  await fs.writeFile(webpPath, webpBuffer);
  await fs.writeFile(jpegPath, jpegBuffer);

  const meta = await sharp(webpBuffer).metadata();

  return {
    src: `/images/${outputDir}/main.webp`,
    width: meta.width ?? preset.width,
    height: meta.height ?? preset.height,
    bytes: webpBuffer.length,
  };
}

async function processSlot(manifest, slot, preset, processed) {
  const source = await pickSource(slot);
  if (!source) return processed;

  console.log(`Optimizing ${slot.output} ← ${source.label}`);

  try {
    manifest[slot.key] = await optimizeOne(slot.output, source.path, preset);
    processed += 1;
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
  }

  return processed;
}

async function main() {
  try {
    await fs.access(UPLOAD_ROOT);
  } catch {
    console.error("Upload folder not found:", UPLOAD_ROOT);
    process.exit(1);
  }

  const existingManifest = await fs
    .readFile(MANIFEST_PATH, "utf8")
    .then(JSON.parse)
    .catch(() => ({}));
  const manifest = { ...existingManifest };
  let processed = 0;

  processed = await processSlot(manifest, HOMEPAGE_HERO, PRESETS.hero, processed);

  for (const hero of CATEGORY_PAGE_HEROES) {
    processed = await processSlot(manifest, hero, PRESETS.hero, processed);
  }

  for (const card of WORLD_CARDS) {
    processed = await processSlot(manifest, card, PRESETS.collection, processed);
  }

  const collectionSlots = await walkSlotDirs(UPLOAD_ROOT);
  for (const relativeDir of collectionSlots) {
    const key = SLOT_KEYS[relativeDir];
    if (!key) continue;

    const preset = relativeDir.startsWith("products/")
      ? PRESETS.product
      : relativeDir.startsWith("blog/")
        ? PRESETS.blog
        : relativeDir.startsWith("lookbook/")
          ? PRESETS.lookbook
          : PRESETS.collection;

    processed = await processSlot(
      manifest,
      { upload: relativeDir, output: relativeDir, key, legacyUploads: [] },
      preset,
      processed
    );
  }

  await fs.mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  if (processed === 0) {
    console.log("\nNo images found.");
    console.log("Drop JPG/PNG into uploads/images/hero-women, hero-men, etc.");
    console.log("See uploads/README.md for the folder map.");
  } else {
    console.log(`\nDone — optimized ${processed} image(s).`);
    console.log("Manifest:", path.relative(ROOT, MANIFEST_PATH));
    console.log("Refresh your browser to see changes.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
