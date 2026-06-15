"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center">
      <p className="mb-2 font-accent text-xs tracking-[0.35em] text-gold uppercase">
        Chevellè
      </p>
      <h1 className="font-display text-3xl font-light text-white">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md font-body text-sm text-white/50">
        The page failed to load. Try refreshing, or restart the dev server with a
        clean cache.
      </p>
      <button
        onClick={reset}
        className="mt-8 border border-gold px-8 py-3 font-body text-xs tracking-[0.2em] text-gold uppercase hover:bg-gold/10"
      >
        Try again
      </button>
    </div>
  );
}
