import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE, META_DESCRIPTIONS } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: META_DESCRIPTIONS.home,
    start_url: "/",
    display: "standalone",
    background_color: "#12150a",
    theme_color: "#A8B38A",
    orientation: "portrait-primary",
    categories: ["shopping", "fashion", "lifestyle"],
    lang: "en-IN",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
