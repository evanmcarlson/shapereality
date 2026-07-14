import type { Metadata } from "next";
import { BriefCta } from "components/studio-site/brief-cta";
import { ReelVideo } from "components/studio-site/reel-video";

export const metadata: Metadata = {
  title: "WebAR Body Tracking",
  description:
    "Body-tracked WebAR for agencies and brands: digital costumes, interactive AR mirrors, gesture games, and apparel activations — metric 3D body tracking in the browser, no app.",
};

const USE_CASES = [
  {
    name: "Branded body effects",
    desc: "Fan transformations, digital costumes, and shareable camera moments anchored to the whole body.",
  },
  {
    name: "Interactive AR mirrors",
    desc: "Event and retail installations: a screen, a camera, and effects that respond to every person who walks up.",
  },
  {
    name: "Gesture games & installations",
    desc: "Body-controlled play — reach, dodge, pose — with no controller and no app download.",
  },
  {
    name: "Rigid & semi-rigid accessories",
    desc: "Wings, armor, orbiting objects, jewelry-scale props — placed in metric space so they hold their size.",
  },
  {
    name: "AR-activated apparel & merch",
    desc: "Shirts and drops that come alive on camera — the wearer becomes the canvas.",
  },
];

const ENGINE_FACTS = [
  {
    label: "Metric, not flat",
    desc: "Raw pose models give you a hip-centered skeleton and 2D dots. Our runtime recovers real camera-space depth — 33 joints in meters, plus chest and hips 6DoF anchors.",
  },
  {
    label: "Occlusion built in",
    desc: "Person segmentation lets effects pass behind the body and in front of it. That alternation is what makes AR read as real.",
  },
  {
    label: "Proven on phones",
    desc: "Benchmarked on mobile Safari and Android Chrome, with deterministic replay tests — tracking changes ship only when the numbers improve.",
  },
];

const CLIPS = [
  { name: "Tangle", src: "/body/studio-effect-particles.mp4" },
  { name: "Fire Wings", src: "/body/studio-effect-wings.mp4" },
  { name: "Star Hologram", src: "/body/studio-effect-stars.mp4" },
];

export default function BodyTrackingPage() {
  return (
    <main>
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          WebAR body tracking
        </span>
        <h1 className="mt-4 max-w-[12ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          The body is the <span className="film-text">interface</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Body-tracked AR that runs in the browser — no app, no headset. Effects
          wrap, orbit, and dress real people in metric 3D, built for agencies
          and brands by a former 8th Wall engineer.
        </p>
      </section>

      <section className="border-t border-[var(--hairline)]">
        {USE_CASES.map((u) => (
          <div
            key={u.name}
            className="film-parent grid gap-2 border-b border-[var(--hairline)] px-5 py-7 md:grid-cols-[1fr_1.2fr] md:items-baseline"
          >
            <h2 className="text-[clamp(20px,3.4vw,34px)] font-bold uppercase leading-[0.95] tracking-tight">
              <span className="film-hover">{u.name}</span>
            </h2>
            <p className="max-w-[56ch] text-[14px] leading-relaxed text-[var(--muted)]">
              {u.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-[var(--hairline)] py-14">
        <div className="mb-8 px-5">
          <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            R&D demonstrations — captured live in the browser, unedited
          </span>
        </div>
        <div className="reel flex gap-3 overflow-x-auto px-5 pb-4">
          {CLIPS.map((c) => (
            <figure
              key={c.src}
              className="relative aspect-[9/16] w-[70vw] max-w-[320px] flex-none overflow-hidden bg-[var(--mist)] sm:w-[280px]"
            >
              <ReelVideo
                src={c.src}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                <p className="text-[20px] font-bold uppercase leading-[0.9] tracking-tight text-white">
                  {c.name}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Powered by Reality Engine
        </span>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {ENGINE_FACTS.map((f) => (
            <div key={f.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {f.label}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        {/* Scope honesty is a selling point with agency buyers, not a hedge. */}
        <p className="mt-10 max-w-[62ch] border-l-2 border-[var(--hairline)] pl-4 text-[13.5px] leading-relaxed text-[var(--muted)]">
          What we don&apos;t claim: garment fit, body measurement, or size
          recommendation. If a brief depends on fit accuracy, we&apos;ll say so
          on the first call and scope what&apos;s actually provable.
        </p>
      </section>

      <BriefCta
        heading="Put a body-tracked idea on real phones"
        sub="Start with a 1–2 week fixed-price prototype: your concept, tracked on real devices, with a recorded stability report."
        subject="Body-tracked project brief"
      />
    </main>
  );
}
