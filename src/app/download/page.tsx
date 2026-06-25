import type { Metadata } from "next";
import {
  APP_DOWNLOAD_PATH,
  buildMetadata,
  META_DESCRIPTIONS,
  PAGE_TITLES,
} from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/seo/StructuredData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DownloadExperience } from "@/components/figma/DownloadExperience";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.download,
  description: META_DESCRIPTIONS.download,
  path: APP_DOWNLOAD_PATH,
});

export default function DownloadPage() {
  return (
    <>
      <StructuredData
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Download App", path: APP_DOWNLOAD_PATH },
        ])}
      />
      <Navbar />
      <DownloadExperience />
      <Footer />
    </>
  );
}
