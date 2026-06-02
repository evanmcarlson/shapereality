import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative h-screen bg-black">
      <Image
        src="/hero.png"
        alt="Shape Reality"
        fill
        className="object-contain"
        priority
      />
      <div className="absolute bottom-16 w-full flex justify-center">
        <Link
          href="/product/uncharted"
          className="font-mono text-sm uppercase tracking-widest text-white hover:opacity-60 transition-opacity"
        >
          [your ticket to the unknown]
        </Link>
      </div>
    </section>
  )
}
