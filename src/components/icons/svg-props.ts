import type { SVGProps } from "react";

export const ICON = {
  stroke: 1.15,
  viewBox: "0 0 64 64",
  viewBoxSm: "0 0 24 24",
} as const;

export function luxurySvgProps(
  className: string,
  viewBox: typeof ICON.viewBox | typeof ICON.viewBoxSm = ICON.viewBox
): SVGProps<SVGSVGElement> {
  return {
    viewBox,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: ICON.stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };
}
