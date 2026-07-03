/** Subtle scroll velocity → CSS blur (px). Tuned for Lenis velocity scale. */
const MAX_BLUR_PX = 0.6;
const VELOCITY_SCALE = 0.028;
const BLUR_LERP = 0.25;
const VELOCITY_CUTOFF = 0.5;

let currentBlur = 0;

export function resetScrollMotionBlur() {
  currentBlur = 0;
  document.documentElement.style.setProperty("--scroll-motion-blur", "0px");
}

export function updateScrollMotionBlur(velocity: number) {
  const speed = Math.abs(velocity);
  const target =
    speed < VELOCITY_CUTOFF ? 0 : Math.min(speed * VELOCITY_SCALE, MAX_BLUR_PX);

  currentBlur += (target - currentBlur) * BLUR_LERP;

  if (currentBlur < 0.02) {
    currentBlur = 0;
  }

  document.documentElement.style.setProperty(
    "--scroll-motion-blur",
    `${currentBlur.toFixed(3)}px`
  );
}
