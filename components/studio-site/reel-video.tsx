"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A reel clip that only decodes/plays while scrolled into view. Avoids
 * running every clip autoplaying at once on page load — heavy on mobile
 * battery and bandwidth for content that's mostly off-screen anyway.
 * Falls back to a static poster frame when reduced motion is preferred.
 */
export function ReelVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    if (inView) {
      el.play().catch(() => {
        /* autoplay can be blocked before first user interaction; poster covers it */
      });
    } else {
      el.pause();
    }
  }, [inView, reducedMotion]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
