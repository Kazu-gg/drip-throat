"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type GenderThemeMode = "neutral" | "women" | "men";

type GenderThemeContextValue = {
  split: number;
  mode: GenderThemeMode;
  setSplit: (pct: number) => void;
};

const GenderThemeContext = createContext<GenderThemeContextValue | null>(null);

const DEFAULT_SPLIT = 50;
const WOMEN_THRESHOLD = 62;
const MEN_THRESHOLD = 38;

export function splitToMode(pct: number): GenderThemeMode {
  if (pct >= WOMEN_THRESHOLD) return "women";
  if (pct <= MEN_THRESHOLD) return "men";
  return "neutral";
}

function clampSplit(pct: number) {
  return Math.min(92, Math.max(8, pct));
}

export function GenderThemeProvider({ children }: { children: ReactNode }) {
  const [split, setSplitState] = useState(DEFAULT_SPLIT);
  const mode = splitToMode(split);

  const applyTheme = useCallback((pct: number) => {
    document.documentElement.dataset.genderTheme = splitToMode(pct);
  }, []);

  const setSplit = useCallback(
    (pct: number) => {
      const next = clampSplit(pct);
      setSplitState(next);
      applyTheme(next);
    },
    [applyTheme]
  );

  useEffect(() => {
    applyTheme(DEFAULT_SPLIT);
    return () => {
      delete document.documentElement.dataset.genderTheme;
    };
  }, [applyTheme]);

  const value = useMemo(
    () => ({ split, mode, setSplit }),
    [split, mode, setSplit]
  );

  return (
    <GenderThemeContext.Provider value={value}>
      {children}
    </GenderThemeContext.Provider>
  );
}

export function useGenderTheme() {
  const ctx = useContext(GenderThemeContext);
  if (!ctx) {
    throw new Error("useGenderTheme must be used within GenderThemeProvider");
  }
  return ctx;
}
