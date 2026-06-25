"use client";

import { useEffect } from "react";

/** Preload hero images after mount to avoid blocking first paint */
export function usePreloadImages(urls: string[]) {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];

    urls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [urls]);
}
