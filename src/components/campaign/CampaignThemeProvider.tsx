"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  parseMainCategoryId,
  SHOP_CATEGORY_PARAM,
  type MainCategoryId,
} from "@/lib/categories";
import {
  applyCampaignTheme,
  DEFAULT_THEME_ID,
  getCampaignCollections,
  getCampaignTheme,
  noirTheme,
  type CampaignTheme,
} from "@/lib/campaign-theme";

type CampaignThemeContextValue = {
  theme: CampaignTheme;
  activeId: string;
  activeCategory: MainCategoryId;
  setActiveCategory: (id: MainCategoryId) => void;
  setThemeById: (id: string) => void;
  resetTheme: () => void;
};

const CampaignThemeContext = createContext<CampaignThemeContextValue | null>(
  null
);

function readCategoryFromUrl(): MainCategoryId {
  if (typeof window === "undefined") return "women";
  const params = new URLSearchParams(window.location.search);
  return parseMainCategoryId(params.get(SHOP_CATEGORY_PARAM));
}

export function CampaignThemeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [activeId, setActiveId] = useState(DEFAULT_THEME_ID);
  const [theme, setTheme] = useState<CampaignTheme>(noirTheme);
  const [activeCategory, setActiveCategoryState] =
    useState<MainCategoryId>("women");

  // Sync category from URL on load + browser back/forward (no useSearchParams / no blank Suspense)
  useEffect(() => {
    setActiveCategoryState(readCategoryFromUrl());
  }, [pathname]);

  useEffect(() => {
    const onPopState = () => setActiveCategoryState(readCategoryFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setThemeById = useCallback((id: string) => {
    setActiveId(id);
    setTheme(id === DEFAULT_THEME_ID ? noirTheme : getCampaignTheme(id));
  }, []);

  const resetTheme = useCallback(() => {
    setActiveId(DEFAULT_THEME_ID);
    setTheme(noirTheme);
  }, []);

  const setActiveCategory = useCallback(
    (id: MainCategoryId) => {
      setActiveCategoryState(id);

      const collections = getCampaignCollections(id);
      const first = collections[0];
      if (first) {
        setActiveId(first.id);
        setTheme(first);
      } else {
        resetTheme();
      }

      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : ""
      );
      if (id === "women") {
        params.delete(SHOP_CATEGORY_PARAM);
      } else {
        params.set(SHOP_CATEGORY_PARAM, id);
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, resetTheme, router]
  );

  // When category loads from URL, ensure activeId matches that category's collections
  useEffect(() => {
    const collections = getCampaignCollections(activeCategory);
    const inList = collections.some((c) => c.id === activeId);
    if (collections[0] && !inList) {
      setActiveId(collections[0].id);
      setTheme(collections[0]);
    }
  }, [activeCategory, activeId]);

  useEffect(() => {
    applyCampaignTheme(theme);
  }, [theme]);

  return (
    <CampaignThemeContext.Provider
      value={{
        theme,
        activeId,
        activeCategory,
        setActiveCategory,
        setThemeById,
        resetTheme,
      }}
    >
      {children}
    </CampaignThemeContext.Provider>
  );
}

export function useCampaignTheme() {
  const ctx = useContext(CampaignThemeContext);
  if (!ctx) {
    throw new Error("useCampaignTheme must be used within CampaignThemeProvider");
  }
  return ctx;
}
