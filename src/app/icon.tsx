import { ImageResponse } from "next/og";
import { DRIPTHROAT_STAG_PATH } from "@/components/brand/DripthroatLogo";

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
          background: "#12150a",
          borderRadius: 6,
        }}
      >
        <svg
          viewBox="0 0 141.8 252.6"
          width="18"
          height="18"
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
