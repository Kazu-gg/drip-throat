import { luxurySvgProps } from "@/components/icons/svg-props";

export type EditIconId =
  | "new-arrivals"
  | "best-sellers"
  | "trending"
  | "wedding-edit"
  | "festive-edit";

type Props = { id: EditIconId; className?: string };

export function EditIcon({ id, className = "h-10 w-10" }: Props) {
  const p = luxurySvgProps(className);

  switch (id) {
    case "new-arrivals":
      return (
        <svg {...p}>
          <path d="M32 8l4 12h12l-10 8 4 12-10-7-10 7 4-12-10-8h12l4-12z" />
        </svg>
      );
    case "best-sellers":
      return (
        <svg {...p}>
          <path d="M32 10l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2 6-12z" />
        </svg>
      );
    case "trending":
      return (
        <svg {...p}>
          <path d="M14 44V28l8 8 10-16 8 6v18" />
          <path d="M12 44h40" opacity="0.45" />
        </svg>
      );
    case "wedding-edit":
      return (
        <svg {...p}>
          <path d="M12 46V26l20-14 20 14v20" />
          <path d="M22 46V34h20v12" opacity="0.45" />
          <path d="M32 12v8M32 28v6" opacity="0.55" />
          <circle cx="32" cy="22" r="3" opacity="0.55" />
        </svg>
      );
    case "festive-edit":
      return (
        <svg {...p}>
          <path d="M32 10c-6 8-14 14-14 22a14 14 0 1028 0c0-8-8-14-14-22z" />
          <path d="M32 46v8M26 54h12" opacity="0.55" />
          <ellipse cx="32" cy="30" rx="5" ry="7" opacity="0.35" />
        </svg>
      );
  }
}
