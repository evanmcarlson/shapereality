import type { Metadata } from "next";
import Link from "next/link";
import { BriefCta } from "components/studio-site/brief-cta";

export const metadata: Metadata = {
  title: "AR Tracking Solutions — Body, Face, Iris & Ear",
  description:
    "Every type of browser-based AR tracking we support — 3D body, face, iris, true ear anchors, wrist, SLAM — on the Reality Engine, our in-house stack. No app download.",
};

// The proof hub (site architecture v2). One job: make a technical or
// semi-technical buyer conclude "they own the whole pipeline" without being
// told to. Pipeline ownership is shown (the four layers, the status table),
// never claimed as a sales line. The engine stays "powered by" — a reason to
// hire the studio, never a separate buying decision (Brand Foundations §02).

const LAYERS = [
  {
    label: "Perception",
    desc: "Standardized TensorFlow models — the same open, battle-tested networks the industry benchmarks on. We don't ship mystery models; we engineer on proven ones.",
  },
  {
    label: "Solve",
    desc: "Our layer: a metric 3D body solve (33 camera-space joints), 6DoF chest, hip, head, and wrist anchors, dedicated iris and ear solvers, filtering and visibility gating tuned per effect.",
  },
  {
    label: "Render",
    desc: "three.js through our own API: person occlusion, room-light estimation, and a real refraction/reflection material system. One pipeline from camera to pixels.",
  },
  {
    label: "Delivery",
    desc: "A URL. iOS Safari and Android Chrome, no app store, no install — self-hostable on your infrastructure.",
  },
];

const ANATOMY = [
  {
    name: "Body",
    desc: "33 metric 3D joints, chest and hip 6DoF anchors, real perspective from a single camera. Digital costumes, AR mirrors, gesture games, AR-activated apparel.",
    href: "/webar-body-tracking",
  },
  {
    name: "Face, iris & ear",
    desc: "A 478-point expression-true mesh for filters, makeup, eyewear, and headwear — plus the two anchors most stacks don't have: iris tracking, and true ear anchors (lobe, canal, helix) for earrings and earbuds.",
    href: "/webar-face-filters",
  },
  {
    name: "Wrist",
    desc: "6DoF wrist anchoring for watches, bracelets, and jewelry — the newest anchors in the engine, shipping through try-on pilots.",
    href: "/virtual-try-on",
  },
  {
    name: "World",
    desc: "SLAM world tracking, sky segmentation, and image targets — deployed through 8th Wall's open-source stack, one of the solutions we build on alongside the engine.",
  },
];

// The honesty table. Publishing a "not offered" column is the most credible
// sentence on the page — nobody shipping vaporware prints one.
const STATUS: {
  state: string;
  tone: "solid" | "outline" | "muted";
  items: string[];
}[] = [
  {
    state: "Supported",
    tone: "solid",
    items: [
      "3D body tracking — 33 metric camera-space joints, chest & hip 6DoF anchors",
      "Face tracking — 478-point mesh, metric head pose",
      "Iris tracking — eye effects with contact-lens-class placement",
      "True ear anchors — lobe, canal, and helix, per ear",
      "Wrist tracking — 6DoF anchors for watches and jewelry",
      "Person occlusion — effects pass behind people",
      "SLAM, sky segmentation & image targets — via 8th Wall's open-source stack",
    ],
  },
  {
    state: "In development",
    tone: "outline",
    items: ["Per-limb occlusion", "Fitted body & rigged avatars"],
  },
  {
    state: "Not offered",
    tone: "muted",
    items: [
      "Apparel try-on — we track the body in metric 3D, but we don't simulate garment fit, sizing, or measurement",
      "Native app SDKs — the browser is the product",
      "The engine as a standalone SDK — it ships inside our projects",
    ],
  },
];

const APPLICATIONS = [
  {
    name: "Virtual try-on",
    desc: "Makeup, eyewear, earrings, watches — anchored to real anatomy on the shopper's own phone, one tap from the product page.",
    href: "/virtual-try-on",
    link: "More",
  },
  {
    name: "Semi-digital apparel",
    desc: "Garments designed with a digital layer: body-tracked effects anchored to physical pieces, a woven tag as the key. Uncharted is the living example.",
    href: "/uncharted",
    link: "See Uncharted",
  },
];

export default function SolutionsPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Solutions
        </span>
        <h1 className="mt-4 max-w-[12ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          Tracking we <span className="film-text">build</span>, not rent
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          The Reality Engine is our in-house tracking stack — body, face, iris,
          ear, and wrist — running in the browser with no app install.
          Standardized TensorFlow models underneath, our own solvers and API on
          top, rendered in three.js.
        </p>
      </section>

      {/* ── WHY WE BUILT IT ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <span className="bk h-fit font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            Why we built it
          </span>
          <div className="max-w-[62ch]">
            <p className="text-[17px] leading-relaxed">
              Platforms rent you tracking. We spent five years inside one —
              supporting the developers, agencies, and brands shipping
              production WebAR at 8th Wall — and learned exactly where rented
              stacks crack under a launch deadline. So we built our own: every
              layer, from the perception models to the pixels, under our hands.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              Client projects start from that working infrastructure — improved
              continuously, versioned, and documented publicly — with no vendor
              roadmap between an idea and shipping it.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FOUR LAYERS — pipeline ownership, shown not claimed ── */}
      <section className="border-y border-[var(--hairline)] bg-black px-5 py-24 text-white">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
          Reality Engine
        </span>
        <h2 className="mt-6 max-w-[13ch] text-[clamp(36px,7.5vw,110px)] font-bold uppercase leading-[0.84] tracking-tight">
          Four layers, one pair of hands
        </h2>
        <div className="mt-12 grid gap-px bg-white/15 border border-white/15 md:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((l, i) => (
            <div key={l.label} className="bg-black p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                {String(i + 1).padStart(2, "0")} — {l.label}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/90">
                {l.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRACKING, BY ANATOMY — rows into the spokes ── */}
      <section>
        <div className="px-5 pb-2 pt-14">
          <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            Tracking, by anatomy
          </span>
        </div>
        {ANATOMY.map((a) => {
          const body = (
            <>
              <h3 className="text-[clamp(26px,5vw,60px)] font-bold uppercase leading-[0.9] tracking-tight">
                <span className={a.href ? "film-hover" : undefined}>
                  {a.name}
                </span>
              </h3>
              <div>
                <p className="max-w-[54ch] text-[14px] leading-relaxed text-[var(--muted)]">
                  {a.desc}
                </p>
                {a.href ? (
                  <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                    More <span aria-hidden="true">→</span>
                  </span>
                ) : null}
              </div>
            </>
          );
          const rowClass =
            "grid gap-3 border-b border-[var(--hairline)] px-5 py-9 md:grid-cols-[1.1fr_1fr] md:items-baseline";
          return a.href ? (
            <Link
              key={a.name}
              href={a.href}
              className={`film-parent group ${rowClass}`}
            >
              {body}
            </Link>
          ) : (
            <div key={a.name} className={rowClass}>
              {body}
            </div>
          );
        })}
      </section>

      {/* ── STATUS TABLE — supported / in development / not offered ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Status, in print
        </span>
        <h2 className="mt-4 max-w-[16ch] text-[clamp(28px,5.5vw,64px)] font-bold uppercase leading-[0.9] tracking-tight">
          What holds, what&apos;s coming, what we don&apos;t do
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden border border-[var(--hairline)] bg-[var(--hairline)] lg:grid-cols-3">
          {STATUS.map((s) => (
            <div key={s.state} className="bg-[var(--paper)] p-6">
              <span
                className={
                  s.tone === "solid"
                    ? "inline-block rounded-full bg-[var(--ink)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--paper)]"
                    : s.tone === "outline"
                      ? "inline-block rounded-full border border-[var(--ink)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                      : "inline-block rounded-full border border-[var(--hairline)] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]"
                }
              >
                {s.state}
              </span>
              <ul className="mt-5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-[var(--hairline)] py-3 text-[13.5px] leading-relaxed text-[var(--muted)] first:border-t-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── APPLICATIONS ── */}
      <section className="border-t border-[var(--hairline)]">
        <div className="px-5 pb-2 pt-14">
          <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            What it powers
          </span>
        </div>
        {APPLICATIONS.map((a) => (
          <Link
            key={a.name}
            href={a.href}
            className="film-parent group grid gap-3 border-b border-[var(--hairline)] px-5 py-9 md:grid-cols-[1.1fr_1fr] md:items-baseline"
          >
            <h3 className="text-[clamp(26px,5vw,60px)] font-bold uppercase leading-[0.9] tracking-tight">
              <span className="film-hover">{a.name}</span>
            </h3>
            <div>
              <p className="max-w-[54ch] text-[14px] leading-relaxed text-[var(--muted)]">
                {a.desc}
              </p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                {a.link} <span aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── CLOSE — engine framing rule kept intact ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <p className="max-w-[24ch] text-[clamp(24px,4.5vw,52px)] font-bold uppercase leading-[0.92] tracking-tight">
          The engine isn&apos;t for sale. The experiences it powers are.
        </p>
      </section>

      <BriefCta
        heading="Start from working infrastructure"
        sub="Your project begins on a tracking stack that already runs — not on rebuilding the camera pipeline against your budget."
      />
    </main>
  );
}
