export type CartLine = {
  slug: string;
  quantity: number;
  size?: string;
  color?: string;
};

export function cartLineKey(line: Pick<CartLine, "slug" | "size" | "color">): string {
  return `${line.slug}::${line.size ?? ""}::${line.color ?? ""}`;
}
