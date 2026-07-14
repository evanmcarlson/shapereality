import type { Metadata } from "next";
import Link from "next/link";
import { ReelVideo } from "components/studio-site/reel-video";

const BRIEF = "mailto:evan@shapereality.com?subject=Project%20brief";

export const metadata: Metadata = {
  description:
    "Browser-based AR that tracks humans. Custom body, face, and virtual try-on experiences for agencies and brands, built by a former 8th Wall engineer. No app download.",
  openGraph: {
    type: "website",
    title: "Shape Reality — Browser-Based AR That Tracks Humans",
    description:
      "Custom body, face, and virtual try-on experiences for agencies and brands, built by a former 8th Wall engineer. No app download.",
  },
  other: {
    "facebook-domain-verification": "xuzr5hg47f0ub5k59e2jti2oewntrq",
  },
};

// Everything a first-time buyer reads on this page answers one of four
// questions, in order: what can you build → why trust you → can I see it →
// what's a sensible first step. (Brand Foundations §11, the 20-second test.)

const PROOF_STRIP = [
  "5 years building at 8th Wall / Niantic",
  "Body, face + ear tracking systems",
  "No app download — it's the browser",
  "Three.js · WebGL · MediaPipe · 8th Wall",
];

const SERVICES = [
  {
    name: "Body-tracked campaigns",
    desc: "Digital costumes, interactive AR mirrors, gesture-driven games, and apparel activations — effects anchored to real people in metric 3D.",
    href: "/webar-body-tracking",
  },
  {
    name: "Face & accessory AR",
    desc: "Face filters, eyewear and headwear try-on, iris effects — and true ear anchoring for earrings and earbuds, beyond the standard face mask.",
    href: "/webar-face-filters",
  },
  {
    name: "Virtual try-on pilots",
    desc: "Feasibility sprints, wrist and jewelry pilots, and ecommerce embeds — scoped honestly, proven on real devices before production.",
    href: BRIEF,
  },
  {
    name: "8th Wall migration",
    desc: "The hosted platform is gone; published experiences go dark Feb 2027. We audit, self-host, and modernize exported projects.",
    href: "/8th-wall-migration",
  },
];

// The reel: clips captured live via the Studio's record button, dropped in
// /public/body/. Add more by dropping a file there and adding a row below —
// White Serpent and Cloak & Chains aren't captured yet, so they're left out
// rather than shown as empty slabs.
const REEL = [
  {
    name: "Tangle",
    note: "a particle stream orbiting the torso",
    src: "/body/studio-effect-particles.mp4",
  },
  {
    name: "Butterflies",
    note: "weaving around the body",
    src: "/body/studio-effect-butterflies.mp4",
  },
  {
    name: "Fire Wings",
    note: "flame membranes on the back",
    src: "/body/studio-effect-wings.mp4",
  },
  {
    name: "Star Hologram",
    note: "glass stars in orbit",
    src: "/body/studio-effect-stars.mp4",
  },
  {
    name: "Crystal",
    note: "the world bends through it",
    src: "/body/studio-effect-refraction.mp4",
  },
  {
    name: "Mirror",
    note: "the room, reflected live",
    src: "/body/studio-effect-chrome.mp4",
  },
  {
    name: "Iridescent",
    note: "thin-film, always shifting",
    src: "/body/studio-effect-iridescent.mp4",
  },
];

// Reality Engine, in buyer language — what it buys the client, not how it's
// architected. It's the delivery advantage, never a separate buying decision.
const ENGINE = [
  {
    label: "Stable anchors, not landmarks",
    desc: "Raw pose models give you jittery dots. Our runtime turns them into metric camera-space joints and 6DoF anchors — tuned against deterministic benchmarks, so effects hold still.",
  },
  {
    label: "Believable by default",
    desc: "Person occlusion, room-light estimation, and a refraction/reflection material kit. Effects pass behind people and pick up the room — they belong to the scene.",
  },
  {
    label: "Yours to keep",
    desc: "On-device processing, self-hostable, no per-user platform fees. It adapts to your stack — Three.js, 8th Wall world tracking, or an existing client runtime.",
  },
];

const PROCESS = [
  {
    n: "01",
    label: "Prototype",
    desc: "A 1–2 week fixed-price technical prototype: the core interaction, on real phones, with a recorded stability report. Small commitment, real answer.",
  },
  {
    n: "02",
    label: "Production",
    desc: "If the prototype passes, we build the full experience: UI, capture and share, analytics, and a device QA matrix.",
  },
  {
    n: "03",
    label: "Launch & maintain",
    desc: "Deployment, browser and device updates, and measurement — WebAR that keeps running after the campaign ships.",
  },
];

// Honest labels: internal builds are R&D demonstrations, not client case
// studies, until there are public client outcomes to show.
const WORK = [
  {
    title: "Reality Engine",
    meta: "2026 · in-house runtime · R&D",
    desc: "Browser-native 3D body, face, and ear tracking — metric camera-space joints, versioned releases, a public devlog — and the effect gallery built on it.",
  },
  {
    title: "Uncharted",
    meta: "2025 · AR-activated puzzle · shipped",
    desc: "A hand-pressed jigsaw with a hidden layer: solve it, scan it, and the artwork comes alive — then claim a rank on the global leaderboard.",
    href: "/uncharted",
  },
  {
    title: "Location-based hunt platform",
    meta: "2026 · platform · in development",
    desc: "Create, publish, and play AR scavenger hunts without code: admin console, game engine, image-target pipeline, analytics.",
  },
  {
    title: "Live activations",
    meta: "2023–25 · events · San Francisco",
    desc: "AR mirrors, pop-ups, and camera-activated wearables for fashion shows, night markets, and street fairs across the city.",
  },
];

export default function StudioHome() {
  return (
    <main>
      {/* ── HERO — a brand lockup, not an advertising headline.
           Hierarchy: identity → category → point of view. The media column
           is the "unicorn slot": real captured work for now, hero video
           (then the WebGL bubble) later. ── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-10 md:pt-14">
        <div className="grid flex-1 gap-x-10 gap-y-10 md:grid-cols-[1.15fr_1fr]">
          {/* type column */}
          <div className="flex flex-col">
            <h1 className="text-[clamp(72px,15vw,200px)] font-bold uppercase leading-[0.8] tracking-tight">
              Shape
              <br />
              Reality
            </h1>
            <div className="mt-8">
              <p className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
                Spatial Studio · San Francisco · Est. &apos;25
              </p>
            </div>
            {/* the point of view, pinned to the bottom of the column */}
            <div className="mt-auto flex flex-wrap items-end justify-between gap-x-10 gap-y-8 pt-16">
              <div>
                <p className="max-w-[26ch] text-[clamp(20px,3.4vw,40px)] font-bold uppercase leading-[1.05] tracking-tight text-white">
                  We build interactive experiences across people, products &
                  places.
                </p>
              </div>
              <a
                href="#proof"
                aria-label="Enter the work"
                className="grid h-28 w-28 shrink-0 place-items-center rounded-full border border-[var(--ink)] text-center font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                Enter
                <br />
                the work ↓
              </a>
            </div>
          </div>
          {/* media column — real work, not a render. Swap for the hero
              video (or the WebGL bubble) when one exists. */}
          <div className="relative hidden overflow-hidden bg-[var(--mist)] md:block">
            <ReelVideo
              src="/body/studio-effect-refraction.mp4"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="bk absolute bottom-4 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.14em] mix-blend-difference text-white">
              Crystal — live in the browser
            </span>
          </div>
        </div>
        {/* mobile media slab — type first, work second (reference order) */}
        <div className="relative mt-10 aspect-[3/4] w-full overflow-hidden bg-[var(--mist)] md:hidden">
          <ReelVideo
            src="/body/studio-effect-refraction.mp4"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="bk absolute bottom-4 left-4 z-10 font-mono text-[10px] uppercase tracking-[0.14em] mix-blend-difference text-white">
            Crystal — live in the browser
          </span>
        </div>
      </section>

      {/* ── CATEGORY STRIP — the bracketed label, full width ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-5">
        <p className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          WebAR / Interactive 3D / Creative technology
        </p>
      </section>

      {/* ── PROOF STRIP — why trust us, in one glance ── */}
      <section className="border-t border-[var(--hairline)]">
        <div className="grid grid-cols-2 gap-px bg-[var(--hairline)] md:grid-cols-4">
          {PROOF_STRIP.map((p) => (
            <div key={p} className="bg-[var(--paper)] px-5 py-5">
              <p className="bk font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-[var(--muted)]">
                {p}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES — the four offers, bold rows, film on hover ── */}
      <section id="services" className="border-t border-[var(--hairline)]">
        {SERVICES.map((s) =>
          s.href.startsWith("/") ? (
            <Link
              key={s.name}
              href={s.href}
              className="film-parent group grid gap-3 border-b border-[var(--hairline)] px-5 py-10 md:grid-cols-[1.2fr_1fr] md:items-baseline"
            >
              <h3 className="text-[clamp(30px,6vw,72px)] font-bold uppercase leading-[0.9] tracking-tight">
                <span className="film-hover">{s.name}</span>
              </h3>
              <div>
                <p className="max-w-[52ch] text-[14px] leading-relaxed text-[var(--muted)]">
                  {s.desc}
                </p>
                <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                  More <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ) : (
            <a
              key={s.name}
              href={s.href}
              className="film-parent group grid gap-3 border-b border-[var(--hairline)] px-5 py-10 md:grid-cols-[1.2fr_1fr] md:items-baseline"
            >
              <h3 className="text-[clamp(30px,6vw,72px)] font-bold uppercase leading-[0.9] tracking-tight">
                <span className="film-hover">{s.name}</span>
              </h3>
              <div>
                <p className="max-w-[52ch] text-[14px] leading-relaxed text-[var(--muted)]">
                  {s.desc}
                </p>
                <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                  Start the conversation <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ),
        )}
        <p className="px-5 py-6 text-[14px] text-[var(--muted)]">
          Agency production team?{" "}
          <Link
            href="/webar-for-agencies"
            className="film-ul font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink)]"
          >
            We white-label →
          </Link>
        </p>
      </section>

      {/* ── LIVE PROOF — the reel, portrait slabs, scroll-snap ── */}
      <section id="proof" className="border-t border-[var(--hairline)] py-14">
        <div className="mb-8 flex items-baseline justify-between px-5">
          <h2 className="text-[clamp(28px,5vw,56px)] font-bold uppercase leading-[0.9] tracking-tight">
            Live proof
          </h2>
          <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            {String(REEL.length).padStart(2, "0")} — running in the browser
          </span>
        </div>
        <div className="reel flex gap-3 overflow-x-auto px-5 pb-4">
          {REEL.map((r, i) => (
            <figure
              key={r.src}
              className="relative aspect-[9/16] w-[78vw] max-w-[360px] flex-none overflow-hidden bg-[var(--mist)] sm:w-[320px]"
            >
              <ReelVideo
                src={r.src}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* index badge — mix-blend keeps it legible over any footage */}
              <span className="bk absolute left-4 top-4 z-10 font-mono text-[10px] uppercase tracking-[0.14em] mix-blend-difference text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* name + note sit on a scrim so busy footage never swallows them */}
              <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4 pt-10">
                <p className="text-[clamp(22px,3vw,30px)] font-bold uppercase leading-[0.9] tracking-tight text-white">
                  {r.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
                  {r.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="bk mt-2 px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
          drag — R&D demonstrations, captured live in the browser, unedited
        </p>
      </section>

      {/* ── POWERED BY REALITY ENGINE — the delivery advantage ── */}
      <section
        id="engine"
        className="border-t border-[var(--hairline)] px-5 py-20"
      >
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Powered by Reality Engine
        </span>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(32px,6.5vw,80px)] font-bold uppercase leading-[0.88] tracking-tight">
          We build the layer we render on
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Our own browser-native tracking runtime for body, face, and ear
          effects. It means your project starts from working infrastructure —
          not from rebuilding the camera and tracking pipeline on your budget.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {ENGINE.map((e) => (
            <div key={e.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {e.label}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ENGAGEMENT MODEL — the sensible first step ── */}
      <section
        id="process"
        className="border-t border-[var(--hairline)] px-5 py-20"
      >
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          How a project starts
        </span>
        <h2 className="mt-4 max-w-[14ch] text-[clamp(32px,6.5vw,80px)] font-bold uppercase leading-[0.88] tracking-tight">
          Prototype first
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Start with a 1–2 week technical prototype. If the interaction and
          device performance pass, continue into production. No six-figure leap
          of faith.
        </p>
        <div className="mt-10 grid gap-px overflow-hidden border border-[var(--hairline)] bg-[var(--hairline)] md:grid-cols-3">
          {PROCESS.map((p) => (
            <div key={p.n} className="bg-[var(--paper)] p-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--muted)]">
                {p.n}
              </p>
              <h3 className="mt-2 text-[clamp(20px,3vw,28px)] font-bold uppercase leading-[0.9] tracking-tight">
                {p.label}
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--muted)]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WORK LIST ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Selected work & R&D
        </span>
        <div className="mt-6">
          {WORK.map((w) =>
            w.href ? (
              <a
                key={w.title}
                href={w.href}
                className="film-parent group grid gap-1 border-b border-[var(--hairline)] py-6 md:grid-cols-[1fr_auto] md:items-baseline"
              >
                <div>
                  <h3 className="text-[clamp(20px,3vw,32px)] font-bold uppercase tracking-tight">
                    <span className="film-hover">{w.title}</span>
                  </h3>
                  <p className="mt-1 max-w-[62ch] text-[14px] leading-relaxed text-[var(--muted)]">
                    {w.desc}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {w.meta}
                </span>
              </a>
            ) : (
              <div
                key={w.title}
                className="grid gap-1 border-b border-[var(--hairline)] py-6 md:grid-cols-[1fr_auto] md:items-baseline"
              >
                <div>
                  <h3 className="text-[clamp(20px,3vw,32px)] font-bold uppercase tracking-tight">
                    {w.title}
                  </h3>
                  <p className="mt-1 max-w-[62ch] text-[14px] leading-relaxed text-[var(--muted)]">
                    {w.desc}
                  </p>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                  {w.meta}
                </span>
              </div>
            ),
          )}
        </div>
      </section>

      {/* ── MANIFESTO + CTA ── */}
      <section className="relative overflow-hidden px-5 py-28 text-center">
        <div
          aria-hidden="true"
          className="bubble absolute left-1/2 top-1/2 h-[46vmin] w-[52vmin] -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        <p className="bk relative font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Transmission
        </p>
        <p className="relative mx-auto mt-4 max-w-[14ch] text-[clamp(36px,8vw,104px)] font-bold uppercase leading-[0.88] tracking-tight">
          Notice harder.
        </p>
        <a
          href={BRIEF}
          className="film-parent group relative mt-10 inline-flex items-baseline gap-3 font-mono text-[14px] uppercase tracking-[0.16em]"
        >
          <span className="film-text font-bold">Send a project brief</span>
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </a>
        <p className="relative mt-4 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
          evan@shapereality.com
        </p>
      </section>
    </main>
  );
}
