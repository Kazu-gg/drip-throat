# CHEVELLÈ image uploads

Drop your files into the matching folder. Use the filename **`main.webp`** (or `main.jpg`) in every folder.

## File format

| Rule | Detail |
|------|--------|
| **Preferred format** | `.webp` |
| **Also accepted** | `.jpg` / `.jpeg` |
| **Avoid** | `.png` (large files), `.heic` (convert first) |
| **Color** | sRGB |
| **Max size** | ~500 KB per image (up to 800 KB for hero) |

## Dimensions

| Folder type | Size | Orientation |
|-------------|------|-------------|
| `collections/*` | **1200 × 1600 px** (or larger, 3:4 ratio) | Portrait |
| `products/*` | **1000 × 1333 px** (3:4 ratio) | Portrait |
| `hero/` | **1920 × 1080 px** | Landscape |
| `lookbook/` | **1200 × 1500 px** | Portrait or editorial crop |
| `blog/` | **1200 × 800 px** | Landscape |

## Folder map

### Women → `collections/women/`
- `sarees/main.webp`
- `lehengas/main.webp`
- `kurti-corset/main.webp`
- `co-ord-set/main.webp`
- `suit/main.webp`
- `shirts-tshirt/main.webp`

### Men → `collections/men/`
- `kurtas/main.webp`
- `men-shirts/main.webp`
- `men-tshirts/main.webp`
- `jeans/main.webp`
- `pants/main.webp`
- `jackets/main.webp`

### Accessories → `collections/accessories/`
- `handbags/main.webp`
- `jewellery/main.webp`
- `watches/main.webp`
- `sunglasses/main.webp`
- `wallets/main.webp`
- `belts/main.webp`

### Products → `products/`
- `midnight-silk-saree/main.webp`
- `royal-embroidered-lehenga/main.webp`
- `ivory-anarkali-suit/main.webp`
- `champagne-co-ord-set/main.webp`
- `ivory-silk-shirt/main.webp`
- `golden-zari-kurti/main.webp`

### Other
- `hero/main.webp` — homepage cinematic hero
- `lookbook/` — editorial lookbook section (name files descriptively)
- `blog/` — blog post cover images

## After uploading

Tell your developer (or Cursor) to wire paths in:
- `src/lib/category-images.ts` — collections
- `src/lib/products.ts` — products
- `src/components/campaign/CinematicHero.tsx` — hero

Example path used in code: `/images/collections/women/sarees/main.webp`
