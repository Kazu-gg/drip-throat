import type { CategoryIconId } from "@/lib/categories";
import { luxurySvgProps } from "@/components/icons/svg-props";

type Props = { id: CategoryIconId; className?: string };

/** Ornamental gold line-art category silhouettes */
export function CategoryIcon({ id, className = "h-16 w-16" }: Props) {
  const p = luxurySvgProps(className);

  switch (id) {
    case "saree":
      return (
        <svg {...p}>
          <path d="M32 6c-9 0-16 7-16 16v32l16 7 16-7V22c0-9-7-16-16-16z" />
          <path d="M16 22c7 5 14 7 16 7s9-2 16-7" opacity="0.55" />
          <path d="M32 24v38M22 34h20M24 42h16M26 50h12" opacity="0.4" />
          <path d="M26 14c2 3 4 4 6 4s4-1 6-4" opacity="0.55" />
        </svg>
      );
    case "lehenga":
      return (
        <svg {...p}>
          <path d="M32 8l-12 9v8l12 36 12-36v-8L32 8z" />
          <circle cx="32" cy="13" r="3.5" />
          <path d="M20 26h24M22 34c4 2 8 3 10 3s6-1 10-3M24 44h16" opacity="0.5" />
          <path d="M26 18l6 4 6-4" opacity="0.45" />
        </svg>
      );
    case "kurti-corset":
      return (
        <svg {...p}>
          <path d="M23 13h18l5 9v31H18V22l5-9z" />
          <path d="M18 28h28M20 36h24M22 44h20M24 52h16" opacity="0.45" />
          <path d="M27 13v9M37 13v9M32 13v9" opacity="0.55" />
          <path d="M26 22h12" opacity="0.55" />
        </svg>
      );
    case "coord":
      return (
        <svg {...p}>
          <path d="M20 11h10v22H20zM34 11h10v30H34z" />
          <path d="M20 33h24M24 41h16" opacity="0.45" />
          <path d="M25 16h6M39 16h6M39 24h6" opacity="0.4" />
        </svg>
      );
    case "suit":
      return (
        <svg {...p}>
          <path d="M32 7L18 18v37h28V18L32 7z" />
          <path d="M26 7l6 11 6-11M32 18v37M18 30h28" opacity="0.5" />
          <path d="M24 38h16M26 46h12" opacity="0.4" />
        </svg>
      );
    case "womens-shirt":
      return (
        <svg {...p}>
          <path d="M19 17l7-7h12l7 7 5 9v30H14V26l5-9z" />
          <path d="M32 10v14M22 28h20M26 36h12" opacity="0.45" />
          <path d="M28 17h8" opacity="0.55" />
        </svg>
      );
    case "kurta":
      return (
        <svg {...p}>
          <path d="M23 11h18l7 11v31H16V22l7-11z" />
          <path d="M16 30h32M19 38h26M21 46h22" opacity="0.45" />
          <path d="M27 11v8M37 11v8" opacity="0.55" />
          <path d="M32 11l-4 6h8l-4-6z" opacity="0.55" />
        </svg>
      );
    case "mens-shirt":
      return (
        <svg {...p}>
          <path d="M17 19l9-9h12l9 9 4 7v30H13V26l4-7z" />
          <path d="M32 10v16M21 28h22M25 36h14" opacity="0.45" />
          <path d="M32 10l-5 7h10l-5-7z" opacity="0.55" />
        </svg>
      );
    case "tshirt":
      return (
        <svg {...p}>
          <path d="M15 21l9-7h16l9 7 3 7v28H12V28l3-7z" />
          <path d="M24 14h16M26 32h12" opacity="0.45" />
        </svg>
      );
    case "jeans":
      return (
        <svg {...p}>
          <path d="M23 9h18l3 46H21L23 9z" />
          <path d="M32 9v46M25 24h14M27 36h10" opacity="0.45" />
          <path d="M26 14h12" opacity="0.4" />
        </svg>
      );
    case "pants":
      return (
        <svg {...p}>
          <path d="M21 11h22l-2 44H23L21 11z" />
          <path d="M32 11v44M26 28h12" opacity="0.45" />
          <path d="M24 16h16" opacity="0.4" />
        </svg>
      );
    case "jacket":
      return (
        <svg {...p}>
          <path d="M17 19l7-7h16l7 7 4 9v28H13V28l4-9z" />
          <path d="M32 12v10M32 28v18M20 32h24" opacity="0.45" />
          <path d="M32 12l-7 9 7 5 7-5-7-9z" opacity="0.55" />
          <path d="M13 28h6M45 28h6" opacity="0.4" />
        </svg>
      );
    case "handbag":
      return (
        <svg {...p}>
          <path d="M17 26h30v28H17V26z" />
          <path d="M23 26v-7c0-5 4-9 9-9s9 4 9 9v7" />
          <path d="M26 38h18M32 26v6" opacity="0.45" />
          <circle cx="32" cy="42" r="2" opacity="0.55" />
        </svg>
      );
    case "jewellery":
      return (
        <svg {...p}>
          <path d="M32 9l9 15-9 15-9-15 9-15z" />
          <circle cx="32" cy="40" r="11" />
          <path d="M32 29v5M32 40l5 5" opacity="0.45" />
          <path d="M28 18l4 6 4-6" opacity="0.4" />
        </svg>
      );
    case "watch":
      return (
        <svg {...p}>
          <circle cx="32" cy="38" r="15" />
          <path d="M25 13h14l3 9H22l3-9z" />
          <path d="M32 32v8l5 4" opacity="0.55" />
          <circle cx="32" cy="38" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "sunglasses":
      return (
        <svg {...p}>
          <path d="M10 34h44" />
          <path d="M14 34c0-9 7-16 16-16h4c9 0 16 7 16 16" />
          <circle cx="22" cy="34" r="9" />
          <circle cx="42" cy="34" r="9" />
          <path d="M31 34h2" opacity="0.55" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...p}>
          <rect x="13" y="21" width="38" height="26" rx="2" />
          <path d="M13 30h38" opacity="0.45" />
          <rect x="40" y="33" width="11" height="10" rx="1" opacity="0.55" />
          <circle cx="45" cy="38" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "belt":
      return (
        <svg {...p}>
          <rect x="8" y="27" width="48" height="9" rx="1.5" />
          <rect x="36" y="22" width="12" height="19" rx="1.5" />
          <rect x="39" y="27" width="6" height="9" rx="0.5" opacity="0.45" />
          <path d="M14 31.5h6" opacity="0.45" />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <circle cx="32" cy="32" r="14" />
        </svg>
      );
  }
}
