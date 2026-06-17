"use client";

import {
  useRef,
  useState,
  type PointerEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

const DRAG_THRESHOLD = 6;

type GrabScrollProps = {
  children: ReactNode;
  className?: string;
  snap?: boolean;
};

/**
 * Horizontal scroll row: native touch swipe on mobile, click-and-drag on desktop.
 * Suppresses link clicks when the user was dragging.
 */
export function GrabScroll({
  children,
  className = "",
  snap = true,
}: GrabScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || !scrollRef.current) return;

    draggingRef.current = true;
    didDragRef.current = false;
    setIsGrabbing(true);
    dragStart.current = {
      x: e.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
    };
    scrollRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !scrollRef.current) return;

    const dx = e.clientX - dragStart.current.x;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      didDragRef.current = true;
    }
    if (didDragRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    }
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsGrabbing(false);
    scrollRef.current?.releasePointerCapture(e.pointerId);
  };

  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
      didDragRef.current = false;
    }
  };

  return (
    <div
      ref={scrollRef}
      data-lenis-prevent
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={handleClickCapture}
      className={`grab-scroll hide-scrollbar flex overflow-x-auto pb-4 ${
        isGrabbing ? "cursor-grabbing select-none" : "cursor-grab"
      } ${className}`}
      style={
        snap
          ? { scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }
          : { WebkitOverflowScrolling: "touch" }
      }
    >
      {children}
    </div>
  );
}
