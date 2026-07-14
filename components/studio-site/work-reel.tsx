"use client";

import { useEffect, useRef, useState } from "react";
import { ReelVideo } from "components/studio-site/reel-video";

export type ReelItem = {
  name: string;
  note: string;
  /** Omit while footage is being captured — renders the intentional
      placeholder slab instead of an empty video. */
  src?: string;
};

/**
 * A horizontal scroll-snap reel of portrait slabs with a progress-tick row.
 * Slabs without a src render as designed placeholders (crop marks + an
 * IN CAPTURE label) so a half-filled reel still looks deliberate. Adding a
 * clip = drop the mp4 in /public and fill in `src`.
 */
export function WorkReel({
  title,
  items,
  captureLabel = "In capture",
  footnote,
}: {
  title: string;
  items: ReelItem[];
  captureLabel?: string;
  footnote: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf: number | null = null;
    function onScroll() {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        if (!el) return;
        const kids = Array.from(el.children) as HTMLElement[];
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        kids.forEach((k, i) => {
          const c = k.offsetLeft + k.offsetWidth / 2;
          const d = Math.abs(c - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="border-t border-[var(--hairline)] py-14">
      <div className="mb-8 flex items-baseline justify-between px-5">
        <h2 className="text-[clamp(28px,5vw,56px)] font-bold uppercase leading-[0.9] tracking-tight">
          {title}
        </h2>
        <span className="bk hidden font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] sm:inline">
          {String(items.length).padStart(2, "0")} — running in the browser
        </span>
      </div>
      <div
        ref={scrollerRef}
        className="reel flex gap-3 overflow-x-auto px-5 pb-4"
      >
        {items.map((r, i) =>
          r.src ? (
            <figure
              key={r.name}
              className="relative aspect-[9/16] w-[78vw] max-w-[360px] flex-none overflow-hidden bg-[var(--mist)] sm:w-[320px]"
            >
              <ReelVideo
                src={r.src}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="bk absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-white mix-blend-difference">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* scrim keeps captions legible over busy footage */}
              <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-10">
                <p className="text-[clamp(22px,3vw,30px)] font-bold uppercase leading-[0.9] tracking-tight text-white">
                  {r.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
                  {r.note}
                </p>
              </figcaption>
            </figure>
          ) : (
            <figure
              key={r.name}
              className="relative aspect-[9/16] w-[78vw] max-w-[360px] flex-none overflow-hidden bg-[var(--mist)] sm:w-[320px]"
            >
              {/* crop marks — a slab waiting for its capture, on purpose */}
              <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[var(--muted)]" />
              <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[var(--muted)]" />
              <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[var(--muted)]" />
              <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[var(--muted)]" />
              <span className="bk absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-0 grid place-items-center">
                <span className="bk font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                  {captureLabel}
                </span>
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[clamp(22px,3vw,30px)] font-bold uppercase leading-[0.9] tracking-tight text-[var(--muted)]">
                  {r.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">
                  {r.note}
                </p>
              </figcaption>
            </figure>
          ),
        )}
      </div>
      <div className="flex items-center justify-between px-5">
        <p className="bk mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
          {footnote}
        </p>
        <div className="mt-2 flex gap-1.5" aria-hidden="true">
          {items.map((r, i) => (
            <span
              key={r.name}
              className={`h-[3px] w-5 transition-colors ${
                i === active ? "bg-[var(--ink)]" : "bg-[var(--hairline)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
