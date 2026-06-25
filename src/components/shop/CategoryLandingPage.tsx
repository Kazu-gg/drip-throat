import { Suspense } from "react";
import type { CategoryLandingId } from "@/lib/category-landing";
import {
  getCategoryLanding,
  getLandingProductCollectionIds,
} from "@/lib/category-landing";
import { CategoryHero } from "@/components/shop/CategoryHero";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { ShopCatalog } from "@/components/shop/ShopCatalog";

export function CategoryLandingPage({ landingId }: { landingId: CategoryLandingId }) {
  const landing = getCategoryLanding(landingId);
  const productCollectionIds = getLandingProductCollectionIds(landingId);

  return (
    <>
      <CategoryHero landingId={landingId} />
      <SubcategoryCards landingId={landingId} />
      <Suspense fallback={null}>
        <ShopCatalog
          title={`All ${landing.name}`}
          subtitle={`Every ${landing.name.toLowerCase()} piece in one place.`}
          landingId={landingId}
          initialParent={landingId === "unisex" ? undefined : landingId}
          parentId={landingId === "unisex" ? undefined : landingId}
          productCollectionIds={productCollectionIds}
        />
      </Suspense>
    </>
  );
}
