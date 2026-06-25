import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OrderTrackingView } from "@/components/shop/OrderTrackingView";
import { buildMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return buildMetadata({
    title: `Order ${id} | Chevellè`,
    description: "Track your Chevellè order from placed to delivered.",
    path: `/orders/${id}`,
    noIndex: true,
  });
}

export default async function OrderPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--campaign-bg)] pt-24 pb-20">
        <OrderTrackingView orderId={id} />
      </main>
      <Footer />
    </>
  );
}
