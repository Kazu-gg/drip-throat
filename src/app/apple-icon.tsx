import { ImageResponse } from "next/og";
import { DRIPTHROAT_STAG_PATH } from "@/components/brand/DripthroatLogo";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#12150a",
          borderRadius: 36,
        }}
      >
        <svg
          viewBox="0 0 141.8 252.6"
          width="100"
          height="100"
          fill="#A8B38A"
          style={{ display: "flex" }}
        >
          <path d={DRIPTHROAT_STAG_PATH} />
        </svg>
      </div>
    ),
    { ...size }
  );
}
