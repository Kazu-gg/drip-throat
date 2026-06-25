# Upload your images here

Drop **JPG, JPEG, or PNG** into the matching folder, then run:

```bash
npm run optimize-images
```

Optimized files go to **`public/images/`** — that is what the website loads. You only manage files in **`uploads/`**.

## Heroes & homepage cards

Upload **two images per gender** for best results (same as Unisex):

| Upload folder | Image type | Used for |
|---------------|------------|----------|
| `images/hero-home/` | Landscape banner | Homepage hero |
| `images/hero-women/` | Landscape banner | `/collections/women` page banner |
| `images/card-women/` | Portrait (3:4) | Homepage **Women** flip card |
| `images/hero-men/` | Landscape banner | `/collections/men` page banner |
| `images/card-men/` | Portrait (3:4) | Homepage **Men** flip card |
| `images/hero-unisex/` | Landscape banner | `/collections/unisex` page banner |
| `images/card-unisex/` | Portrait (3:4) | Homepage **Unisex** flip card |

If you skip `card-women` or `card-men`, the optimizer uses that gender’s **hero upload** as a fallback for the card.

## What gets generated

| You upload to | Optimizer writes to |
|---------------|---------------------|
| `hero-women/` | `public/images/collections/women/hero/main.webp` |
| `card-women/` | `public/images/collections/women/main.webp` |
| `hero-men/` | `public/images/collections/men/hero/main.webp` |
| `card-men/` | `public/images/collections/men/main.webp` |
| `hero-unisex/` | `public/images/collections/unisex/hero/main.webp` |
| `card-unisex/` | `public/images/collections/unisex/main.webp` |
| `hero-home/` | `public/images/hero/main.webp` |

## Subcategory & product images

| Upload folder | Used for |
|---------------|----------|
| `images/collections/women/sarees/` | Sarees category card |
| `images/collections/women/lehengas/` | Lehengas |
| `images/collections/men/jackets/` | Jackets |
| `images/products/…` | Product photos |
| `images/lookbook/` | Editorial |
| `images/blog/` | Blog covers |

## Recommended sizes

| Slot | Size | Ratio |
|------|------|-------|
| `hero-*` folders | 1920 × 1080 | Landscape |
| `card-*` folders | 1200 × 1600 | Portrait (3:4) |

Larger originals are fine — the optimizer resizes automatically.

## Tips

- One image per folder (any filename).
- After replacing a file, run `npm run optimize-images` again.
- Do not put raw JPGs in `public/` — only the optimizer should write there.
