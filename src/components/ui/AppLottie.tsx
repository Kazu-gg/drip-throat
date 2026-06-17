"use client";

import Lottie from "lottie-react";
import { getAppLottieForStep } from "@/lib/app-lottie";

type AppLottieProps = {
  step: number;
  className?: string;
};

export function AppLottie({ step, className = "h-36 w-36 sm:h-40 sm:w-40" }: AppLottieProps) {
  return (
    <Lottie
      key={step}
      animationData={getAppLottieForStep(step)}
      loop
      autoplay
      className={className}
      aria-hidden
    />
  );
}
