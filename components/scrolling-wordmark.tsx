"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ScrollingBannerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ScrollingBanner({
  src,
  alt,
  width,
  height,
}: ScrollingBannerProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = -((window.scrollY * 1.5) % window.innerWidth);
          row.style.transform = `translateX(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={rowRef}
        className="flex will-change-transform"
        style={{ width: "200vw" }}
      >
        <div className="w-screen flex-none">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="block h-auto w-full invert dark:invert-0"
          />
        </div>
        <div className="w-screen flex-none" aria-hidden>
          <Image
            src={src}
            alt=""
            width={width}
            height={height}
            className="block h-auto w-full invert dark:invert-0"
          />
        </div>
      </div>
    </div>
  );
}
