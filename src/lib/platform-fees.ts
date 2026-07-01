/** Platform fee charged per cart item (INR). Product prices are not charged. */
export const PLATFORM_FEE_PER_ITEM = Number(
  process.env.NEXT_PUBLIC_PLATFORM_FEE_PER_ITEM ?? 49
);

export function calculatePlatformFee(itemCount: number): number {
  if (itemCount <= 0) return 0;
  return PLATFORM_FEE_PER_ITEM * itemCount;
}

export function formatPlatformFee(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function platformFeeLineLabel(itemCount: number): string {
  if (itemCount <= 1) return "Platform fee (1 item)";
  return `Platform fee (${itemCount} items)`;
}
