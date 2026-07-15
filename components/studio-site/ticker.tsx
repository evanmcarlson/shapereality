"use client";

import { useEffect, useRef } from "react";

/**
 * Capability ticker. CSS animation does the crawl (zero JS at rest);
 * scrolling the page scrubs the playback rate up so the strip feels wired
 * to the same nervous system as the Shape.
 */
const TERMS = [
  "White label",
  "Web-based",
  "Augmented reality",
  "Virtual try-on",
  "Face tracking",
  "Iris tracking",
  "Ear tracking",
  "Hand tracking",
  "Wrist tracking",
  "3D Body tracking",
];

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY || 0;
    let energy = 0;
    let raf: number | null = null;

    function tick() {
      raf = null;
      energy *= 0.92;
      const anim = track?.getAnimations()[0];
      if (anim) anim.playbackRate = 1 + Math.min(energy, 3);
      if (energy > 0.02) raf = requestAnimationFrame(tick);
    }
    function onScroll() {
      const y = window.scrollY || 0;
      energy = Math.min(4, energy + Math.abs(y - lastY) * 0.01);
      lastY = y;
      if (raf === null) raf = requestAnimationFrame(tick);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  const row = (key: string) => (
    <span key={key} className="flex items-center" aria-hidden={key === "b"}>
      {TERMS.map((t) => (
        <span
          key={t}
          className="flex items-center whitespace-nowrap text-[15px] font-bold uppercase tracking-tight"
        >
          <span>{t}</span>
          <span aria-hidden="true" className="px-6 text-[10px]">
            *
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      className="overflow-hidden border-t border-[var(--hairline)] py-3"
      aria-label="Capabilities"
    >
      <div ref={trackRef} className="ticker-track">
        {row("a")}
        {row("b")}
      </div>
    </section>
  );
}
