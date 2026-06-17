"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";

const GAP = 20;
const SPRING = { stiffness: 165, damping: 34, mass: 1.15 };
const MOMENTUM = 0.32;
const DRAG_THRESHOLD = 8;

type CarouselContextValue = {
  trackX: MotionValue<number>;
  containerWidth: number;
  cardWidth: number;
  step: number;
  sidePadding: number;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

/** Parallax + brightness for category card images */
export function useLuxuryCarouselMotion(index: number) {
  const ctx = useContext(CarouselContext);
  const fallbackTrackX = useMotionValue(0);

  const trackX = ctx?.trackX ?? fallbackTrackX;
  const containerWidth = ctx?.containerWidth ?? 0;
  const cardWidth = ctx?.cardWidth ?? 280;
  const step = ctx?.step ?? cardWidth + GAP;
  const sidePadding = ctx?.sidePadding ?? 0;

  const distance = useTransform(trackX, (tx) => {
    if (containerWidth <= 48) return 0;
    const viewportCenter = containerWidth / 2;
    const cardCenter = sidePadding + index * step + cardWidth / 2 + tx;
    return cardCenter - viewportCenter;
  });

  const imageX = useTransform(distance, (d) => {
    if (containerWidth <= 48) return "0%";
    const ratio = Math.max(-1, Math.min(1, d / (step * 1.2)));
    return `${(-ratio * 7).toFixed(2)}%`;
  });

  const imageFilter = useTransform(distance, (d) => {
    if (containerWidth <= 48) return "none";
    const t = Math.min(Math.abs(d) / (step * 2), 1);
    const blur = t * 4;
    const brightness = 1.08 - t * 0.36;
    return `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
  });

  return { distance, imageX, imageFilter };
}

function cardWidthForViewport(width: number) {
  if (width < 640) return 220;
  if (width < 1024) return 260;
  return 280;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

type LuxuryCarouselProps<T> = {
  items: T[];
  itemKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  resetKey?: string;
};

type SlideProps = {
  index: number;
  cardWidth: number;
  children: ReactNode;
};

function LuxuryCarouselSlide({ index, cardWidth, children }: SlideProps) {
  const ctx = useContext(CarouselContext);
  const { distance } = useLuxuryCarouselMotion(index);
  const measured = (ctx?.containerWidth ?? 0) > 48;

  const scale = useTransform(distance, (d) => {
    if (!measured) return 1;
    const step = cardWidth + GAP;
    const t = Math.abs(d) / step;
    if (t <= 0.5) return 1 - t * 0.2;
    if (t <= 2) return 0.9 - (t - 0.5) * 0.033;
    return 0.85;
  });

  const opacity = useTransform(distance, (d) => {
    if (!measured) return 1;
    const step = cardWidth + GAP;
    const t = Math.min(Math.abs(d) / (step * 2.2), 1);
    return 1 - t * 0.45;
  });

  const shadowOpacity = useTransform(distance, (d) => {
    const step = cardWidth + GAP;
    const t = Math.min(Math.abs(d) / (step * 0.85), 1);
    return (1 - t) * 0.5;
  });

  const zIndex = useTransform(distance, (d) =>
    Math.round(50 - Math.abs(d) / 8)
  );

  return (
    <motion.article
      className="relative flex-shrink-0 will-change-transform"
      style={{
        width: cardWidth,
        scale,
        opacity,
        zIndex,
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute -bottom-5 left-1/2 h-12 w-[78%] -translate-x-1/2 rounded-full bg-gold/30 blur-2xl"
        style={{ opacity: shadowOpacity }}
      />
      {children}
    </motion.article>
  );
}

export function LuxuryCarousel<T>({
  items,
  itemKey,
  renderItem,
  resetKey,
}: LuxuryCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const didDrag = useRef(false);
  const wheelSnapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const cardWidth = cardWidthForViewport(containerWidth);
  const step = cardWidth + GAP;
  const sidePadding = Math.max(0, containerWidth / 2 - cardWidth / 2);
  const maxScroll = Math.max(0, (items.length - 1) * step);

  const targetX = useMotionValue(0);
  const trackX = targetX;

  const bounds = useMemo(
    () => ({ min: -maxScroll, max: 0 }),
    [maxScroll]
  );

  const contextValue = useMemo<CarouselContextValue>(
    () => ({
      trackX,
      containerWidth,
      cardWidth,
      step,
      sidePadding,
    }),
    [trackX, containerWidth, cardWidth, step, sidePadding]
  );

  const snapTo = useCallback(
    (raw: number, velocity = 0) => {
      const projected = raw + velocity * MOMENTUM;
      const index = Math.round(-projected / step);
      const clamped = clamp(index, 0, Math.max(0, items.length - 1));
      return -clamped * step;
    },
    [items.length, step]
  );

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const width = el.offsetWidth;
    if (width > 0) setContainerWidth(width);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, resetKey, items.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, resetKey]);

  useLayoutEffect(() => {
    targetX.stop();
    targetX.set(0);
  }, [resetKey, targetX, items.length]);

  const handleDragStart = () => {
    didDrag.current = false;
    setIsDragging(true);
  };

  const handleDrag = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > DRAG_THRESHOLD) didDrag.current = true;
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);
    const snap = snapTo(targetX.get(), info.velocity.x);
    const clamped = clamp(snap, bounds.min, bounds.max);
    animate(targetX, clamped, { type: "spring", ...SPRING });
  };

  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (didDrag.current) {
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const next = clamp(targetX.get() - delta * 0.95, bounds.min, bounds.max);
      targetX.set(next);
      didDrag.current = true;

      if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
      wheelSnapTimer.current = setTimeout(() => {
        const snap = snapTo(targetX.get(), 0);
        const clamped = clamp(snap, bounds.min, bounds.max);
        animate(targetX, clamped, { type: "spring", ...SPRING });
        didDrag.current = false;
      }, 140);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
    };
  }, [bounds.min, bounds.max, snapTo, targetX]);

  const nudge = (direction: -1 | 1) => {
    const current = snapTo(targetX.get(), 0);
    const index = Math.round(-current / step);
    const next = clamp(index + direction, 0, items.length - 1);
    animate(targetX, -next * step, { type: "spring", ...SPRING });
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className="relative mx-auto w-full" data-lenis-prevent>
        <div
          ref={containerRef}
          className="relative w-full min-h-[360px] overflow-hidden py-6 sm:min-h-[420px] sm:py-10"
          onClickCapture={handleClickCapture}
          aria-roledescription="carousel"
        >
          <motion.div
            className={`flex touch-pan-y items-stretch ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            drag="x"
            dragConstraints={{ left: bounds.min, right: bounds.max }}
            dragElastic={0.06}
            dragMomentum={false}
            style={{
              x: trackX,
              paddingLeft: sidePadding,
              paddingRight: sidePadding,
              gap: GAP,
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {items.map((item, index) => (
              <LuxuryCarouselSlide
                key={itemKey(item, index)}
                index={index}
                cardWidth={cardWidth}
              >
                {renderItem(item, index)}
              </LuxuryCarouselSlide>
            ))}
          </motion.div>
        </div>

        {items.length > 1 && (
          <div className="mt-1 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous category"
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <span aria-hidden className="text-lg">
                ←
              </span>
            </button>
            <p className="font-body text-[10px] tracking-[0.35em] text-white/25 uppercase">
              Swipe · Drag · Scroll
            </p>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next category"
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-white/40 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <span aria-hidden className="text-lg">
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
}
