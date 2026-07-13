"use client";

import { useEffect, useRef } from "react";

// The signature moment: a solid headline with a holographic layer beneath,
// revealed through a pointer-following "lens" — the site performing what the
// studio sells. Touch devices get a slow ambient sweep (see globals.css);
// reduced-motion users get the solid headline only.
export function LensHeadline({ lines }: { lines: string[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.5, y: 0.4 });
  const current = useRef({ x: 0.5, y: 0.4 });
  const raf = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const tick = () => {
      // slight lag makes the lens feel physical
      current.current.x += (target.current.x - current.current.x) * 0.14;
      current.current.y += (target.current.y - current.current.y) * 0.14;
      root.style.setProperty(
        "--lens-x",
        `${(current.current.x * 100).toFixed(2)}%`,
      );
      root.style.setProperty(
        "--lens-y",
        `${(current.current.y * 100).toFixed(2)}%`,
      );
      raf.current = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      target.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };

    root.addEventListener("pointermove", onMove);
    raf.current = requestAnimationFrame(tick);
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const rendered = (
    <>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={rootRef}
      className="studio-lens-auto relative cursor-default select-none"
    >
      <h1 className="font-sans font-semibold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,7.5vw,104px)] text-[#F2F0EB]">
        {rendered}
      </h1>
      <div
        aria-hidden
        className="studio-lens-layer studio-holo-text pointer-events-none absolute inset-0 font-sans font-semibold tracking-[-0.03em] leading-[0.98] text-[clamp(44px,7.5vw,104px)] motion-reduce:hidden"
      >
        {rendered}
      </div>
    </div>
  );
}
