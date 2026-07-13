import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LensHeadline } from "components/studio-site/lens-headline";

const CONTACT = "mailto:evan@shapereality.com?subject=Project%20inquiry";

export const metadata: Metadata = {
  description:
    "Shape Reality is an independent augmented reality studio in San Francisco. We design and engineer AR for places, brands, and products — in the browser, no app required.",
  openGraph: {
    type: "website",
    title: "Shape Reality — Independent AR Studio, San Francisco",
    description:
      "We design and engineer augmented reality for places, brands, and products — in the browser, no app required.",
  },
  other: {
    "facebook-domain-verification": "xuzr5hg47f0ub5k59e2jti2oewntrq",
  },
};

const INK = "#0B0B0F";
const BONE = "#F2F0EB";
const GRAPHITE = "#75757F";
const HAIRLINE = "#1F1F27";

const LAYERS = [
  {
    n: "01",
    name: "Places",
    desc: "Location-based AR for hotels, venues, museums, and cities: scavenger hunts, tours, and activations guests reach from a QR code. The property comes alive — no app, no hardware.",
  },
  {
    n: "02",
    name: "Brands & products",
    desc: "WebAR campaigns and AR-activated objects. Packaging, posters, menus, and merchandise that open into digital experience the moment a camera sees them.",
  },
  {
    n: "03",
    name: "Platforms & pipelines",
    desc: "Senior WebAR engineering: 8th Wall migrations, three.js and WebXR builds, computer vision, and the content systems that keep AR running after launch day.",
  },
];

const WORK = [
  {
    title: "Uncharted",
    meta: "2025 · AR-activated puzzle · sold direct",
    desc: "A hand-pressed jigsaw with a hidden layer: solve it, scan it, and the artwork comes alive — then claim a rank on the global leaderboard.",
    href: "/uncharted",
  },
  {
    title: "Location-based hunt platform",
    meta: "2026 · platform · in development for boutique hospitality",
    desc: "Create, publish, and play AR scavenger hunts without code: admin console, schema-driven game engine, image-target pipeline, and analytics.",
  },
  {
    title: "Live activations",
    meta: "2023–25 · events · San Francisco",
    desc: "AR mirrors, pop-ups, and camera-activated wearables for fashion shows, night markets, and street fairs across the city.",
  },
];

const PROCESS = [
  ["Concept sprint", "one week — we scope the moment worth building"],
  ["Prototype", "a working experience in your browser, not a deck"],
  ["Launch", "anywhere a camera lives — QR code to live venue"],
];

export default function StudioHomePage() {
  return (
    <main style={{ backgroundColor: INK }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="flex min-h-screen flex-col justify-center">
        <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10 pt-24 pb-16">
          <p className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#9FF0D8" }} />
              Independent AR studio
            </span>
            <span>San Francisco</span>
            <span className="hidden md:inline">37.77°N · 122.42°W</span>
          </p>

          <LensHeadline lines={["The world has", "another layer.", "We build it."]} />

          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[46ch] text-[17px] leading-relaxed" style={{ color: "#B9B9C1" }}>
              Shape Reality designs and engineers augmented reality for places,
              brands, and products — experiences people reach through the
              browser they already have. No app. No headset. Just the world,
              with more in it.
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <a
                href={CONTACT}
                className="rounded-full px-7 py-4 font-sans text-sm font-medium transition-opacity hover:opacity-85"
                style={{ backgroundColor: BONE, color: INK }}
              >
                Start a project
              </a>
              <a
                href="#work"
                className="font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-[#F2F0EB]"
                style={{ color: GRAPHITE }}
              >
                See the work ↓
              </a>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <div className="border-t" style={{ borderColor: HAIRLINE }}>
          <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10 py-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
              5 years at 8th Wall&nbsp;&nbsp;·&nbsp;&nbsp;Niantic VPS World Tour&nbsp;&nbsp;·&nbsp;&nbsp;AWE Europe&nbsp;&nbsp;·&nbsp;&nbsp;MIT Reality Hack
            </p>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ─────────────────────────────── */}
      <section className="border-t" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10 py-24 md:py-32">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
            Capabilities
          </p>
          <h2 className="mb-16 font-sans text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em]" style={{ color: BONE }}>
            What we layer onto the world
          </h2>

          <div className="flex flex-col">
            {LAYERS.map(({ n, name, desc }) => (
              <div
                key={n}
                className="studio-layer-row grid grid-cols-1 gap-3 border-t py-9 md:grid-cols-[180px_1fr] md:gap-8"
                style={{ borderColor: HAIRLINE }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] pt-1.5" style={{ color: GRAPHITE }}>
                  Layer {n}
                </p>
                <div>
                  <h3 className="mb-2 font-sans text-2xl font-medium tracking-[-0.01em]" style={{ color: BONE }}>
                    <span className="studio-holo-hover">{name}</span>
                  </h3>
                  <p className="max-w-[62ch] leading-relaxed" style={{ color: "#9B9BA5" }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ────────────────────────────── */}
      <section id="work" className="scroll-mt-10 border-t" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10 py-24 md:py-32">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
            Selected work
          </p>
          <h2 className="mb-16 font-sans text-[clamp(28px,3.6vw,44px)] font-semibold tracking-[-0.02em]" style={{ color: BONE }}>
            Physical things, digital lives
          </h2>

          <div className="flex flex-col">
            {WORK.map(({ title, meta, desc, href }) => {
              const inner = (
                <div className="grid grid-cols-1 gap-3 py-9 md:grid-cols-[1fr_360px] md:items-start md:gap-8">
                  <div>
                    <h3 className="mb-2 flex items-baseline gap-3 font-sans text-[clamp(24px,2.8vw,34px)] font-medium tracking-[-0.015em]" style={{ color: BONE }}>
                      {title}
                      {href && (
                        <span className="text-lg transition-transform group-hover:translate-x-1" style={{ color: GRAPHITE }}>
                          →
                        </span>
                      )}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
                      {meta}
                    </p>
                  </div>
                  <p className="leading-relaxed" style={{ color: "#9B9BA5" }}>
                    {desc}
                  </p>
                </div>
              );
              return href ? (
                <Link key={title} href={href} className="group border-t" style={{ borderColor: HAIRLINE }}>
                  {inner}
                </Link>
              ) : (
                <div key={title} className="border-t" style={{ borderColor: HAIRLINE }}>
                  {inner}
                </div>
              );
            })}
          </div>

          {/* Uncharted artwork as evidence, not identity */}
          <Link href="/uncharted" className="mt-10 block overflow-hidden rounded-2xl border" style={{ borderColor: HAIRLINE }}>
            <Image
              src="/texture2.png"
              alt="Uncharted — the AR-activated puzzle"
              width={1120}
              height={560}
              className="w-full object-cover transition-transform duration-700 hover:scale-[1.015]"
            />
          </Link>
        </div>
      </section>

      {/* ── THE STUDIO ───────────────────────────────── */}
      <section className="border-t" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-10 px-6 py-24 md:grid-cols-[180px_1fr] md:gap-8 md:px-10 md:py-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] pt-2" style={{ color: GRAPHITE }}>
            The studio
          </p>
          <div>
            <h2 className="mb-8 max-w-[26ch] font-sans text-[clamp(26px,3.2vw,40px)] font-semibold tracking-[-0.02em] leading-[1.1]" style={{ color: BONE }}>
              Not an agency. One engineer who spent five years building the
              platform everyone else built on.
            </h2>
            <div className="flex max-w-[62ch] flex-col gap-4 leading-relaxed" style={{ color: "#9B9BA5" }}>
              <p>
                Shape Reality is the independent practice of{" "}
                <a
                  href="https://evanmcarlson.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-[#3A3A44] underline-offset-4 transition-colors hover:decoration-[#F2F0EB]"
                  style={{ color: BONE }}
                >
                  Evan Carlson
                </a>
                — creative technologist, five years at 8th Wall before Niantic
                sunset it. The &ldquo;we&rdquo; on this page is honest: me,
                plus trusted collaborators when a project calls for them.
              </p>
              <p>
                That shape is the point. You work directly with the person who
                designs and builds your experience — no account layers, no
                handoffs, no agency overhead. Fixed-scope sprints, working
                prototypes instead of decks, and a direct line the whole way.
                Built for founders and operators who have a place, a product,
                or a brand — and no innovation department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto grid w-full max-w-[1120px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-3 md:gap-8 md:px-10">
          {PROCESS.map(([step, desc], i) => (
            <div key={step}>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
                {String(i + 1).padStart(2, "0")} — {step}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#9B9BA5" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto w-full max-w-[1120px] px-6 md:px-10 py-24 md:py-32">
          <h2 className="max-w-[22ch] font-sans text-[clamp(32px,5vw,64px)] font-semibold tracking-[-0.025em] leading-[1.05]" style={{ color: BONE }}>
            Have a place, product, or idea that deserves{" "}
            <span className="studio-holo-text">another layer</span>?
          </h2>
          <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center">
            <a
              href={CONTACT}
              className="rounded-full px-7 py-4 text-center font-sans text-sm font-medium transition-opacity hover:opacity-85"
              style={{ backgroundColor: BONE, color: INK }}
            >
              evan@shapereality.com
            </a>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: GRAPHITE }}>
              Replies within a day · San Francisco · working anywhere
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
