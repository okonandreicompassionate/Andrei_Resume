"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      // Only schedule one paint per frame, no matter how many
      // mousemove events fire in between.
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          if (divRef.current) {
            divRef.current.style.background = `radial-gradient(600px at ${pos.current.x}px ${pos.current.y}px, rgba(255,255,255,0.06), transparent 80%)`;
          }
          rafId.current = null;
        });
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ willChange: "background" }}
    />
  );
}