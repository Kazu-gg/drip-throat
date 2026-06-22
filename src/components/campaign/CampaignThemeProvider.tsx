"use client";

import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  parseMainCategoryId,
  SHOP_CATEGORY_PARAM,
  type MainCategoryId,
} from "@/lib/categories";
import {
  applyCampaignTheme,
  DEFAULT_THEME_ID,
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

function CampaignThemeProviderInner({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryFromUrl = parseMainCategoryId(
    searchParams.get(SHOP_CATEGORY_PARAM)
  );

  const [activeId, setActiveId] = useState(DEFAULT_THEME_ID);
  const [theme, setTheme] = useState<CampaignTheme>(noirTheme);
  const [activeCategory, setActiveCategoryState] =
    useState<MainCategoryId>(categoryFromUrl);

  useEffect(() => {
    setActiveCategoryState(categoryFromUrl);
  }, [categoryFromUrl]);

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
      resetTheme();

      const params = new URLSearchParams(searchParams.toString());
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
    [pathname, resetTheme, router, searchParams]
  );

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

export function CampaignThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <CampaignThemeProviderInner>{children}</CampaignThemeProviderInner>
    </Suspense>
  );
}

export function useCampaignTheme() {
  const ctx = useContext(CampaignThemeContext);
  if (!ctx) {
    throw new Error("useCampaignTheme must be used within CampaignThemeProvider");
  }
  return ctx;
}
