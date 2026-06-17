import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionOrnament } from "@/components/icons/SectionOrnament";
import { SeoImage } from "@/components/seo/SeoImage";
import { getProductBySlug } from "@/lib/products";
import { buildMetadata, PAGE_TITLES, metaDescription } from "@/lib/seo";
import { AUTH_ROUTES } from "@/lib/routes";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLES.checkout,
  description: metaDescription(
    "Secure checkout for Chevellè premium luxury fashion. Sign in with a verified email to complete your purchase."
  ),
  path: AUTH_ROUTES.checkout,
  noIndex: true,
});

type PageProps = {
  searchParams: Promise<{ product?: string }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const { product: productSlug } = await searchParams;
  const product = productSlug ? getProductBySlug(productSlug) : null;

  if (productSlug && !product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-5 pt-28 pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-center font-body text-xs tracking-[0.4em] text-gold uppercase">
            Checkout
          </p>
          <h1 className="mt-3 text-center font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
            Your Bag
          </h1>
          <SectionOrnament className="mx-auto mt-6 w-40" />

          {product ? (
            <div className="mt-12 border border-white/10 bg-black-charcoal/60 p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative aspect-[3/4] w-full max-w-[160px] overflow-hidden bg-black-soft">
                  <SeoImage
                    src={product.image.src}
                    alt={product.image.alt}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs tracking-[0.25em] text-gold uppercase">
                    {product.category}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-light text-white">
                    {product.name}
                  </h2>
                  <p className="mt-2 font-body text-xl text-gold">
                    {product.priceDisplay}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-8">
                <p className="font-body text-sm leading-relaxed text-white/50">
                  Full payment integration is coming soon. Your account is
                  verified — you&apos;re ready to checkout when we launch
                  secure payments.
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-6 inline-block font-body text-xs tracking-[0.15em] text-gold uppercase hover:underline"
                >
                  ← Back to product
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-12 border border-white/10 bg-black-charcoal/60 p-8 text-center">
              <p className="font-body text-sm text-white/50">
                Your bag is empty. Browse collections to find something you
                love.
              </p>
              <Link
                href="/collections"
                className="mt-6 inline-block border border-gold/30 px-8 py-3 font-body text-xs tracking-[0.15em] text-gold uppercase transition-colors hover:bg-gold/10"
              >
                Shop Collections
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
