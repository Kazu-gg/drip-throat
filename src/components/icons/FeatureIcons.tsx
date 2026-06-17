import { luxurySvgProps, ICON } from "@/components/icons/svg-props";

export type FeatureIconId =
  | "sparkle"
  | "shield"
  | "truck"
  | "package"
  | "razorpay"
  | "verified"
  | "support";

type Props = { id: FeatureIconId; className?: string };

export function FeatureIcon({ id, className = "h-6 w-6" }: Props) {
  const p = luxurySvgProps(className, ICON.viewBoxSm);

  switch (id) {
    case "sparkle":
      return (
        <svg {...p}>
          <path d="M12 2l1.8 6.2H20l-5 3.8 1.9 6.2L12 15l-4.9 3.2 1.9-6.2-5-3.8h6.2L12 2z" />
          <circle cx="19" cy="5" r="1" opacity="0.5" />
          <circle cx="5" cy="8" r="0.75" opacity="0.4" />
        </svg>
      );
    case "shield":
    case "razorpay":
      return (
        <svg {...p}>
          <path d="M12 2l8 4v5c0 4.5-3 8.5-8 10-5-1.5-8-5.5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "truck":
      return (
        <svg {...p}>
          <path d="M1 7h12v9H1V7zM13 9h4l3 3v4h-7V9z" />
          <circle cx="5.5" cy="18" r="2" />
          <circle cx="17.5" cy="18" r="2" />
          <path d="M7 18h7" opacity="0.45" />
        </svg>
      );
    case "package":
      return (
        <svg {...p}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
          <path d="M12 7v5" opacity="0.45" />
        </svg>
      );
    case "verified":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      );
    case "support":
      return (
        <svg {...p}>
          <path d="M4 14v-2a8 8 0 0116 0v2" />
          <path d="M4 14a2 2 0 002 2h1v-4H6a2 2 0 00-2 2zM20 14a2 2 0 01-2 2h-1v-4h1a2 2 0 012 2z" />
          <path d="M12 18v2M10 22h4" opacity="0.45" />
        </svg>
      );
  }
}
