import type { Metadata } from "next";
import { BriefCta } from "components/studio-site/brief-cta";

export const metadata: Metadata = {
  title: "WebAR for Agencies — White-Label Engineering",
  description:
    "Senior white-label WebAR engineering for agencies: camera and tracking architecture, Three.js/WebGL implementation, mobile optimization, and technical QA. You keep the client and the credit.",
};

const PROMISES = [
  {
    label: "Founder-direct",
    desc: "The engineer on the kickoff call is the one writing the code — five years at 8th Wall/Niantic, now a specialist studio.",
  },
  {
    label: "White-label by default",
    desc: "NDA-comfortable, credit-optional. Your deck, your client relationship, your creative direction. We're the engineering layer.",
  },
  {
    label: "No forced platform",
    desc: "We recommend the right stack per project — open-source, licensed SDK, or our own runtime — and hand over source your team can own.",
  },
  {
    label: "Production discipline",
    desc: "Device QA matrices, performance benchmarks on real phones, regression tests, and clean handoff docs. WebAR that survives launch week.",
  },
];

const FITS = [
  "Experiential & activation agencies without an in-house WebAR specialist",
  "3D / VFX studios that need browser delivery for a campaign",
  "Ecommerce agencies whose clients are asking for try-on",
  "Former 8th Wall partners handling migrations or overflow",
  "Producers who need a senior contractor for a technical sprint",
];

export default function AgenciesPage() {
  return (
    <main>
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          WebAR for agencies
        </span>
        <h1 className="mt-4 max-w-[13ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          Your senior <span className="film-text">WebAR layer</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Shape Reality plugs into your production team as the WebAR engineering
          layer. You keep the client relationship and the creative direction; we
          handle camera and tracking architecture, Three.js and WebGL
          implementation, mobile optimization, deployment, and technical QA.
        </p>
      </section>

      <section className="border-t border-[var(--hairline)]">
        <div className="grid gap-px bg-[var(--hairline)] md:grid-cols-2">
          {PROMISES.map((p) => (
            <div key={p.label} className="bg-[var(--paper)] px-5 py-8">
              <h2 className="text-[clamp(20px,3vw,30px)] font-bold uppercase leading-[0.95] tracking-tight">
                {p.label}
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-[var(--muted)]">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Built for teams like
        </span>
        <ul className="mt-6 max-w-[64ch]">
          {FITS.map((f) => (
            <li
              key={f}
              className="border-b border-[var(--hairline)] py-4 text-[15px] leading-relaxed"
            >
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-[52ch] text-[14px] leading-relaxed text-[var(--muted)]">
          Engagements are sprint-shaped: a fixed-price feasibility milestone
          first, then production. Your producer gets one senior contact, not a
          bench.
        </p>
      </section>

      <BriefCta
        heading="Book a capability review"
        sub="Thirty minutes, your upcoming briefs, an honest read on what's feasible in the browser — and where we'd fit into your pipeline."
        cta="Book a 30-minute review"
        subject="Agency capability review"
      />
    </main>
  );
}
