import type { Metadata } from "next";
import { BriefCta } from "components/studio-site/brief-cta";
import { ReelVideo } from "components/studio-site/reel-video";

export const metadata: Metadata = {
  title: "WebAR Face Filters — Face, Iris & Ear Tracking",
  description:
    "Custom browser-based face filters and accessory AR: face-tracked effects, eyewear and headwear try-on, iris tracking, and true ear anchoring for earrings and earbuds. No app download.",
};

const USE_CASES = [
  {
    name: "Branded face filters",
    desc: "Campaign face effects that run from a link or QR code — no app store, no platform account required.",
  },
  {
    name: "Eyewear & headwear",
    desc: "Glasses, hats, and headpieces anchored to a metric head pose — with temples that reach toward real ears, not floating stubs.",
  },
  {
    name: "Ear-worn products",
    desc: "Earrings, ear cuffs, earbuds, and hearing products. Dedicated ear tracking gives us lobe, canal, and helix anchors — the piece sits where it actually sits.",
  },
  {
    name: "Iris & face-paint effects",
    desc: "Eye color changes, makeup zones, and full-face materials mapped to a 478-point mesh that follows every expression.",
  },
];

const ENGINE_FACTS = [
  {
    label: "A head pose you can build on",
    desc: "478 face landmarks lifted to a metric, smoothed 6DoF head anchor — accessories hold position through fast head turns.",
  },
  {
    label: "True ear anchors",
    desc: "Most face AR guesses ear positions from the face rim, and it shows. We run a dedicated ear model with three tracked points per ear.",
  },
  {
    label: "On-device, no lock-in",
    desc: "All tracking runs in the visitor's browser. No video leaves the device, no per-user platform fees, self-hostable on your infrastructure.",
  },
];

const CLIPS = [
  {
    name: "Crystal",
    note: "the material kit — refraction, live",
    src: "/body/studio-effect-refraction.mp4",
  },
  {
    name: "Iridescent",
    note: "thin-film, always shifting",
    src: "/body/studio-effect-iridescent.mp4",
  },
];

export default function FaceFiltersPage() {
  return (
    <main>
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          WebAR face filters & accessories
        </span>
        <h1 className="mt-4 max-w-[12ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          Beyond the <span className="film-text">face mask</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Face-tracked filters and accessory try-on in the browser. The
          difference is in the anchoring: metric head pose, expression-true
          mesh, and dedicated ear tracking for pieces that sit where they
          should.
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
      </section>

      <section className="border-t border-[var(--hairline)] py-14">
        <div className="mb-8 px-5">
          <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            The house material — R&D demonstrations, captured live, unedited
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
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
                  {c.note}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <BriefCta
        heading="Put a face-tracked idea on real phones"
        sub="Start with a 1–2 week fixed-price prototype: your product or effect, on-face, on real devices — with an honest read on what holds up."
        subject="Face / accessory AR brief"
      />
    </main>
  );
}
