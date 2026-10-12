import { createOgImage } from "@/lib/og-image";
import { getCollectionBySlug } from "@/lib/data";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  return createOgImage({
    title: collection?.name.toUpperCase() ?? "DRIPTHROAT",
    subtitle: collection?.subtitle ?? "Curated Elegance",
  });
}
