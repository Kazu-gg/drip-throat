import type Lenis from "lenis";

let lenis: Lenis | null = null;
const listeners = new Set<(instance: Lenis | null) => void>();

export function setLenis(instance: Lenis | null) {
  lenis = instance;
  listeners.forEach((listener) => listener(instance));
}

export function getLenis() {
  return lenis;
}

export function subscribeLenis(listener: (instance: Lenis | null) => void) {
  listeners.add(listener);
  listener(lenis);
  return () => {
    listeners.delete(listener);
  };
}
