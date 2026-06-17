import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#D4AF37",
            fontWeight: 600,
          }}
        >
          C
        </div>
      </div>
    ),
    { ...size }
  );
}
