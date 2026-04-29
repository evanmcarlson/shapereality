'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export function Hero() {
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const offset = -(window.scrollY * 1.5 % window.innerWidth)
          row.style.transform = `translateX(${offset}px)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative h-screen bg-white dark:bg-black">
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <div
          ref={rowRef}
          className="flex will-change-transform"
          style={{ width: '200vw' }}
        >
          <div className="w-screen flex-none">
            <Image
              src="/wordmark.png"
              alt="Shape Reality"
              width={7367}
              height={746}
              className="block h-auto w-full invert dark:invert-0"
              priority
            />
          </div>
          <div className="w-screen flex-none" aria-hidden>
            <Image
              src="/wordmark.png"
              alt=""
              width={7367}
              height={746}
              className="block h-auto w-full invert dark:invert-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
