import { NewsletterForm } from "components/newsletter-form";
import { TheShape } from "components/studio-site/the-shape";
import { Ticker } from "components/studio-site/ticker";
import { WorkReel, type ReelItem } from "components/studio-site/work-reel";
import type { Metadata } from "next";
import Link from "next/link";

const BRIEF = "mailto:evan@shapereality.com?subject=Project%20brief";
const VTO_SPRINT =
  "mailto:evan@shapereality.com?subject=Try-on%20feasibility%20sprint";

export const metadata: Metadata = {
  description:
    "Virtual try-on and body-tracked AR that runs in the browser. Makeup, eyewear, earrings, watches — plus full-body effects — built on our own tracking engine by a former 8th Wall engineer. No app download.",
  openGraph: {
    type: "website",
    title: "Shape Reality — Browser-Based AR That Tracks Humans",
    description:
      "Virtual try-on and body-tracked AR in the browser: face, true ear anchors, wrists, full body. Built and maintained by a former 8th Wall engineer.",
  },
  other: {
    "facebook-domain-verification": "xuzr5hg47f0ub5k59e2jti2oewntrq",
  },
};

// Ten sections, three grounds (paper / ink / cobalt), two live moments (the
// Shape in the hero and the closer). Every block still answers the
// 20-second test: what can you build → why trust you → can I see it →
// what's a sensible first step. (Brand Foundations §11 + v2.5 amendment.)

const PROOF_STRIP = [
  "Built by an ex-8th Wall Engineer",
  "Body, face + ear tracking",
  "No app required",
  "Ongoing developer support",
];

// The wedge offers below the try-on flagship. VTO leads the page now, so
// these rows carry the rest of the bench.
const SERVICES = [
  {
    name: "Body-tracked campaigns",
    desc: "Digital costumes, interactive AR mirrors, gesture-driven games, and apparel activations — effects anchored to real people in metric 3D.",
    href: "/webar-body-tracking",
  },
  {
    name: "Face & accessory AR",
    desc: "Face filters, headwear, iris effects — and true ear anchoring for earrings and earbuds, beyond the standard face mask.",
    href: "/webar-face-filters",
  },
  {
    name: "8th Wall migration",
    desc: "The hosted platform is gone; published experiences go dark Feb 2027. We audit, self-host, and modernize exported projects.",
    href: "/8th-wall-migration",
  },
];

// The reel: clips captured live via the Studio's record button, dropped in
// /public/body/. Add one by dropping a file there and adding a row here.
const BODY_REEL: ReelItem[] = [
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

// Face effects reel — placeholders on purpose until each demo is captured.
// Same workflow as the body reel: mp4 into /public/face/, add the src here.
const FACE_REEL: ReelItem[] = [
  { name: "Eyewear", note: "frames anchored to the face mesh" },
  { name: "Earrings", note: "true ear anchors — lobe, helix, canal" },
  { name: "Makeup", note: "lips, liner, shadow — rendered live" },
  { name: "Glass Mask", note: "the house material, on a face" },
];

// Reality Engine, in buyer language — the delivery advantage, never a
// separate buying decision.
const ENGINE = [
  {
    label: "Stable anchors, not landmarks",
    desc: "Raw pose models give you jittery dots. Our runtime turns them into metric camera-space joints and 6DoF anchors — tuned against deterministic benchmarks, so effects hold still.",
  },
  {
    label: "Believable by default",
    desc: "Person occlusion, room-light estimation, and a real refraction/reflection material system. Effects pass behind people and pick up the room — they belong to the scene.",
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
    desc: "We stay on as your AR dev team — browser and device updates, performance monitoring, new effects on the same anchors. WebAR that keeps running after the campaign ships.",
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

// Try-on tiles: placeholder slabs until each demo is captured (mp4s land in
// /public/vto/ and get a src just like the reels).
const VTO_TILES = [
  {
    name: "Face",
    items: "Makeup · Eyewear · Headwear",
    tag: "Rendered on the face mesh",
  },
  {
    name: "Ear",
    items: "Earrings · Earbuds",
    tag: "True ear anchors — lobe, helix, canal",
  },
  {
    name: "Wrist",
    items: "Watches · Jewelry",
    tag: "Pilot program",
  },
];

export default function StudioHome() {
  return (
    <main>
      {/* ── 01 · HERO — the lockup and the Shape ─────────────────────────
           The brand lockup (identity → category → point of view) sharing
           the viewport with the live signature object. The canvas spans
           the whole hero but is pointer-transparent; the object is placed
           over the anchor block and overlaps the headline, refracting the
           actual DOM type through real per-channel refraction. ── */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden px-5 pb-8 pt-10 md:pt-14">
        <div className="grid flex-1 gap-x-0 gap-y-10 md:grid-cols-[1.05fr_1fr]">
          {/* type column */}
          <div className="flex flex-col">
            <h1
              id="hero-headline"
              className="relative whitespace-nowrap text-[clamp(72px,15vw,210px)] font-bold uppercase leading-[0.8] tracking-tight"
            >
              Shape
              <br />
              Reality
            </h1>
            <p className="mt-6 max-w-[26ch] text-[clamp(20px,3.4vw,40px)] font-bold uppercase leading-[1.05] tracking-tight">
              We build interactive experiences across people, products &
              places.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <p className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]">
                Spatial Studio · San Francisco · Est. &apos;25
              </p>
            </div>
            {/* the one true glass surface in the UI: a CTA refracting the
                live canvas behind it via backdrop-filter — not a gradient */}
            <a
              href={BRIEF}
              className="relative z-20 mt-6 w-fit whitespace-nowrap rounded-full border border-[rgba(127,127,127,0.35)] bg-[rgba(255,255,255,0.1)] px-7 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-xl backdrop-saturate-150 transition-transform hover:scale-[1.04]"
            >
              Start a project
            </a>
          </div>
          {/* the Shape's slot — receives the drag (the canvas above it is
              pointer-transparent) and extends into the headline on desktop
              so the glass visibly bends the letterforms */}
          <div className="relative md:-ml-20">
            <div
              id="hero-anchor"
              aria-hidden="true"
              className="mx-auto aspect-square w-[76vw] max-w-[420px] md:absolute md:inset-x-0 md:top-1/2 md:mx-0 md:w-auto md:max-w-none md:-translate-y-1/2"
            />
          </div>
        </div>
        <TheShape
          variant="glass"
          anchorId="hero-anchor"
          refractTargetId="hero-headline"
          className="absolute inset-0 z-10 h-full w-full"
          label="An iridescent soap-bubble form refracting the Shape Reality wordmark"
        />
      </section>

      {/* ── 02 · CAPABILITY TICKER ── */}
      <Ticker />

      {/* ── 03 · PROOF STRIP — why trust us, in one glance ── */}
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

      {/* ── 04 · TRY-ON — the flagship offer, first cobalt slab ── */}
      <section id="tryon" className="bg-[var(--cobalt)] px-5 py-20 text-white">
        <p className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
          Virtual try-on
        </p>
        <h2 className="mt-4 max-w-[12ch] text-[clamp(40px,8vw,110px)] font-bold uppercase leading-[0.85] tracking-tight">
          Try-on, in the browser.
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-white/80">
          Makeup, eyewear, earrings, watches — anchored to real anatomy, in
          metric 3D, on the shopper&apos;s own phone. One tap from the product
          page. No app between them and the purchase.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {VTO_TILES.map((t, i) => (
            <div
              key={t.name}
              className="relative aspect-[9/12] overflow-hidden border border-white/25 sm:aspect-[9/14]"
            >
              <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-white/50" />
              <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-white/50" />
              <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/50" />
              <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/50" />
              <span className="bk absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                {String(i + 1).padStart(2, "0")} — demo in capture
              </span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[clamp(28px,3.4vw,44px)] font-bold uppercase leading-[0.9] tracking-tight">
                  {t.name}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80">
                  {t.items}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">
                  {t.tag}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href={VTO_SPRINT}
            className="rounded-full border border-white px-7 py-3.5 font-mono text-[12px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-[var(--cobalt)]"
          >
            Book a try-on feasibility sprint
          </a>
          <p className="max-w-[40ch] font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-white/60">
            Wrist try-on ships as a pilot until our tracking benchmark passes.
            We don&apos;t overpromise.
          </p>
        </div>
      </section>

      {/* ── 05 · THE REST OF THE BENCH — wedge offers, bold rows ── */}
      <section id="services">
        {SERVICES.map((s) => (
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
        ))}
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

      {/* ── 06 · SELECTED WORK — BODY — live proof, kept ── */}
      <div id="work">
        <WorkReel
          title="3D Body Tracking"
          items={BODY_REEL}
          footnote="drag — R&D demonstrations, captured live in the browser, unedited"
        />
      </div>

      {/* ── 07 · SELECTED WORK — FACE — same slab pattern, intentional
             placeholders until each clip is captured ── */}
      <WorkReel
        title="Face"
        items={FACE_REEL}
        captureLabel="In capture — 08.2026"
        footnote="face reel filling in as demos are recorded — same pipeline, same honesty"
      />

      {/* ── 08 · REALITY ENGINE — the ink manifesto slab ── */}
      <section
        id="engine"
        className="border-y border-[var(--hairline)] bg-black px-5 py-24 text-white"
      >
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
          Powered by Reality Engine
        </span>
        <h2 className="mt-6 max-w-[13ch] text-[clamp(40px,9vw,130px)] font-bold uppercase leading-[0.84] tracking-tight">
          We build the layer we render on
        </h2>
        <p className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-white/70">
          Our own browser-native tracking runtime for body, face, and ear
          effects. Your project starts from working infrastructure — not from
          rebuilding the camera and tracking pipeline on your budget.
        </p>
        <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-3">
          {ENGINE.map((e) => (
            <div key={e.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                {e.label}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-white/90">
                {e.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 09 · ENGAGEMENT MODEL — the sensible first step ── */}
      <section id="process" className="px-5 py-20">
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

      {/* ── 10 · WORK INDEX ── */}
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

      {/* ── 11 · CLOSER — second cobalt slab; the Shape returns in chrome,
             fully interactive, where the 2D blob used to be ── */}
      <section
        id="contact"
        className="bg-[var(--cobalt)] px-5 py-20 text-white"
      >
        <p className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
          Have a project in mind? / Agency partnerships welcome
        </p>
        <div className="mt-10 grid items-center gap-12 md:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-[clamp(48px,9.5vw,150px)] font-bold uppercase leading-[0.82] tracking-tight">
              Shape
              <br />
              <a
                href={BRIEF}
                className="border-b-[0.045em] border-[var(--acid)] transition-colors hover:text-white/80"
              >
                what&apos;s next.
              </a>
            </h2>
            <div className="mt-14 max-w-[380px]">
              <p className="bk mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                Field notes from the engine — monthly
              </p>
              <NewsletterForm tone="inverse" />
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[420px]">
            <TheShape
              variant="chrome"
              interactive
              tintColor="#0012ff"
              className="absolute inset-0 h-full w-full"
              label="A chrome morphing form reflecting the cobalt page — drag to spin it"
            />
            <span className="bk pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
              Drag — it&apos;s real
            </span>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-t border-white/30 pt-6 font-mono text-[11px] uppercase tracking-[0.16em]">
          <a href={BRIEF} className="film-ul [--ink:#fff]">
            evan@shapereality.com
          </a>
          <span className="text-white/70">
            San Francisco / Available worldwide
          </span>
          <span className="text-white/70">© Shape Reality 2026</span>
        </div>
        <p className="bk mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Transmission — notice harder.
        </p>
      </section>
    </main>
  );
}
