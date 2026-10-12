import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dripthroat | Curated Elegance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type OgTemplateProps = {
  title?: string;
  subtitle?: string;
};

export function OgTemplate({
  title = "DRIPTHROAT",
  subtitle = "Curated Elegance",
}: OgTemplateProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#12150a",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(168,179,138,0.18) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          fontSize: title.length > 20 ? 48 : 64,
          fontWeight: 400,
          letterSpacing: "0.15em",
          color: "#A8B38A",
          marginBottom: 16,
          textAlign: "center",
          padding: "0 48px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 24,
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.12em",
          marginBottom: 24,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.4)",
          maxWidth: 640,
          textAlign: "center",
        }}
      >
        Premium fashion, timeless style, and curated collections.
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 36,
          fontSize: 13,
          color: "rgba(168,179,138,0.55)",
          letterSpacing: "0.25em",
        }}
      >
        dripthroat.fashion
      </div>
    </div>
  );
}

export function createOgImage(props?: OgTemplateProps) {
  return new ImageResponse(<OgTemplate {...props} />, { ...size });
}
