"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  APP_DEMO_VIDEO,
  APP_DEMO_VIDEO_WEBM,
} from "@/lib/app-media";

export function AppPhoneVideo() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const play = () => {
      video.play().catch(() => {
        /* autoplay blocked until interaction — acceptable */
      });
    };

    if (video.readyState >= 2) {
      setReady(true);
      play();
    } else {
      video.addEventListener("loadeddata", () => {
        setReady(true);
        play();
      });
    }

    video.addEventListener("error", () => setFailed(true));
  }, [reduceMotion]);

  if (failed) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-black px-6 text-center">
        <p className="font-body text-[10px] tracking-[0.25em] text-gold/60 uppercase">
          App preview
        </p>
        <p className="mt-3 font-body text-xs leading-relaxed text-white/35">
          Add your screen recording to{" "}
          <code className="text-gold/50">public/videos/chevelle-app-demo.mp4</code>
        </p>
      </div>
    );
  }

  return (
    <>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="h-6 w-6 animate-spin rounded-full border border-gold/20 border-t-gold/70" />
        </div>
      )}
      <video
        ref={videoRef}
        className={`h-full w-full object-cover object-top transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        autoPlay={!reduceMotion}
        loop
        muted
        playsInline
        preload="metadata"
        aria-label="Chevellè mobile app demonstration"
      >
        <source src={APP_DEMO_VIDEO_WEBM} type="video/webm" />
        <source src={APP_DEMO_VIDEO} type="video/mp4" />
      </video>
    </>
  );
}
