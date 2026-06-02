import Link from 'next/link'
import { HeroScene } from 'components/hero-scene'

export function Hero() {
  return (
    <section className="relative h-screen bg-black overflow-hidden">
      {/* 3D layer */}
      <HeroScene />

      {/* 2D overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 pointer-events-none">
        <Link
          href="/product/uncharted"
          className="pointer-events-auto font-mono text-sm uppercase tracking-widest text-white hover:opacity-60 transition-opacity"
        >
          [your ticket to the unknown]
        </Link>
      </div>
    </section>
  )
}
