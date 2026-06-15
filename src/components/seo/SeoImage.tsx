import Image from "next/image";

type SeoImageBase = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

type SeoImageFill = SeoImageBase & {
  fill: true;
  width?: never;
  height?: never;
};

type SeoImageSized = SeoImageBase & {
  fill?: false;
  width: number;
  height: number;
};

type SeoImageProps = SeoImageFill | SeoImageSized;

/** SEO-optimized image: descriptive alt, explicit dimensions, lazy loading by default */
export function SeoImage(props: SeoImageProps) {
  const { src, alt, priority = false, className = "", sizes } = props;
  const loadingProps = priority ? { priority: true } : { loading: "lazy" as const };

  if (props.fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        className={className}
        {...loadingProps}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      sizes={sizes}
      className={className}
      {...loadingProps}
    />
  );
}
