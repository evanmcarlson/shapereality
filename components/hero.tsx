// import { HeroScene } from 'components/hero-scene'
import Image from 'next/image'
import Link from 'next/link'
import { NewsletterForm } from 'components/newsletter-form'

export function Hero() {
  return (
    <section className="relative flex-1 min-h-0 overflow-hidden">
      {/* 3D layer — disabled for load performance; re-enable HeroScene import above to restore */}
      {/* <HeroScene /> */}

      <div className="relative z-10 flex h-full flex-col items-center py-16 pointer-events-none">
        <div className="@container flex w-full max-w-120 flex-col gap-2 px-4">
          <Image src="/wordmark.png" alt="Shape Reality" width={384} height={42} className="w-full" style={{ filter: 'invert(var(--logo-invert))' }} />
          <span className="font-mono text-[clamp(8px,2.75cqi,14px)] uppercase tracking-widest text-black dark:text-white whitespace-nowrap">
            Copyright © Shape Reality, LLC • All Rights Reserved
          </span>
          <div className="pointer-events-auto mt-4">
            <NewsletterForm />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center w-full">
          <Link
            href="/product/uncharted"
            className="pointer-events-auto block w-full max-w-120 px-4 text-center font-mono text-l uppercase tracking-widest text-black dark:text-white transition-opacity hover:opacity-60"
          >
            [your ticket to the unknown]
          </Link>
        </div>
      </div>
    </section>
  )
}
