import {
  ArchiveBoxIcon,
  PuzzlePieceIcon,
  QrCodeIcon,
  SparklesIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { NewsletterForm } from 'components/newsletter-form'
import Image from 'next/image'
import Link from 'next/link'

const HOW_TO_PLAY = [
  { n: 1, Icon: ArchiveBoxIcon, verb: 'Receive', desc: 'Get your puzzle and the zine.' },
  { n: 2, Icon: PuzzlePieceIcon, verb: 'Solve', desc: 'Put the pieces together.' },
  { n: 3, Icon: QrCodeIcon, verb: 'Verify', desc: 'Scan to verify your completion.' },
  { n: 4, Icon: SparklesIcon, verb: 'Unlock', desc: 'A hidden experience comes to life.' },
  { n: 5, Icon: TrophyIcon, verb: 'Compete', desc: 'See your rank on the leaderboard.' },
]

export function Hero() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="flex min-h-screen flex-col justify-between pt-20">
        <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 py-12">

          {/* Eyebrow — mono label */}
          <p className="font-mono text-[11px] uppercase tracking-widest">
            <span className="animate-pulse" style={{ color: '#34c759' }}>● New Drop Live</span>
            <span className="text-black opacity-60 dark:text-white">
              &nbsp;&nbsp;&nbsp;Uncharted
            </span>
          </p>

{/* Headline — Jakarta Sans */}
          <h1 className="font-sans text-[clamp(40px,11vw,64px)] font-bold uppercase leading-[0.95] tracking-tight text-black dark:text-white">
            A puzzle made to be played.
          </h1>

          {/* Subhead — mono label */}
          <p className="font-mono text-[11px] uppercase tracking-widest text-black opacity-50 dark:text-white">
            Complete the challenge and earn your ranking.
          </p>

          {/* CTAs — mono labels */}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/product/uncharted"
              className="block rounded-2xl text-center font-sans font-medium text-sm uppercase tracking-widest px-6 py-4 text-white bg-blue-600 transition-opacity hover:opacity-80"
            >
              Discover Uncharted
            </Link>
            <a
              href="#leaderboard"
              className="block rounded-2xl text-center border border-neutral-200 dark:border-neutral-700 font-sans font-medium text-sm uppercase tracking-widest px-6 py-4 text-black dark:text-white transition-opacity hover:opacity-80"
            >
              Leaderboard
            </a>
          </div>

        </div>

        {/* Product image */}
        <div className="mx-auto w-full px-0 sm:max-w-md sm:px-4">
          <Image
            src="/texture2.svg"
            alt="Uncharted — the puzzle"
            width={480}
            height={480}
            className="w-full object-cover invert dark:invert-0"
            priority
          />
        </div>
      </section>

      {/* ── HOW TO PLAY ──────────────────────────── */}
      <section className="border-t border-black/10 px-4 py-24 dark:border-white/10">
        <div className="mx-auto w-full max-w-md">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-black opacity-40 dark:text-white">
            Start Here
          </p>
          <h2 className="mb-12 font-sans text-[clamp(28px,8vw,44px)] font-bold uppercase leading-[1.0] tracking-tight">
            <span className="bg-black text-white dark:bg-white dark:text-black [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              How to play.
            </span>
          </h2>

          <div className="flex flex-col">
            {HOW_TO_PLAY.map(({ n, Icon, verb, desc }) => (
              <div
                key={n}
                className="flex items-start gap-5 border-b border-black/10 py-6 dark:border-white/10"
              >
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-black opacity-50 dark:text-white" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-black dark:text-white">
                  <span className="font-bold">{n}&nbsp;&nbsp;{verb}</span>
                  <span className="opacity-50">&nbsp;&nbsp;{desc}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── LEADERBOARD ──────────────────────────── */}
      <section
        id="leaderboard"
        className="scroll-mt-16 border-t border-black/10 px-4 py-24 dark:border-white/10"
      >
        <div className="mx-auto w-full max-w-md">
          <h2 className="mb-10 text-center font-mono text-[11px] uppercase tracking-widest text-black opacity-40 dark:text-white">
            Global Leaderboard
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10">
                <th className="pb-3 text-left font-mono text-[9px] uppercase tracking-widest text-black opacity-30 dark:text-white">
                  Rank
                </th>
                <th className="pb-3 text-left font-mono text-[9px] uppercase tracking-widest text-black opacity-30 dark:text-white">
                  Player
                </th>
                <th className="pb-3 text-right font-mono text-[9px] uppercase tracking-widest text-black opacity-30 dark:text-white">
                  Puzzle
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pb-3 pt-5 font-mono text-base font-bold" style={{ color: '#ffcc00' }}>
                  1
                </td>
                <td className="pb-3 pt-5 font-sans text-sm font-medium uppercase text-black dark:text-white">
                  Evan
                </td>
                <td className="pb-3 pt-5 text-right font-mono text-sm text-black opacity-60 dark:text-white">
                  00:42:11
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────── */}
      <section className="border-t border-black/10 px-4 py-24 dark:border-white/10">
        <div className="mx-auto w-full max-w-md flex flex-col gap-4">
          <h2 className="font-sans text-[clamp(24px,7vw,36px)] font-bold uppercase leading-[1.0] tracking-tight text-black dark:text-white">
            Stay in the game.
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-widest text-black opacity-50 dark:text-white">
            Get notified when a new drop goes live.
          </p>
          <div className="pt-2">
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  )
}
