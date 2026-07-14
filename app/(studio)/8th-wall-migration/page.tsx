import type { Metadata } from "next";
import { BriefCta } from "components/studio-site/brief-cta";

export const metadata: Metadata = {
  title: "8th Wall Migration & Self-Hosting",
  description:
    "The 8th Wall hosted platform retired in February 2026 and published experiences go offline February 2027. Audit, self-host, and modernize your exported projects — with a former 8th Wall engineer.",
};

const FACTS = [
  { n: "2026.02.28", desc: "The hosted 8th Wall platform retired." },
  { n: "2027.02.28", desc: "Published experiences go offline." },
  {
    n: "MIT",
    desc: "Face effects, image targets, and core modules are now open source; SLAM ships as a free binary.",
  },
];

const OFFERS = [
  {
    name: "Migration audit",
    price: "from $750",
    desc: "A written plan for what you have: exported projects, dependencies, licensing, hosting, analytics, and what it takes to keep each experience alive.",
  },
  {
    name: "Export to self-host",
    price: "scoped per project",
    desc: "Build pipeline, asset paths, domains, analytics, and regression testing — your experience running on infrastructure you own, before the deadline.",
  },
  {
    name: "Modernization",
    price: "scoped per project",
    desc: "Replace aging project glue with a current Vite/Three.js stack while preserving the XR behavior your users know.",
  },
  {
    name: "World + people",
    price: "scoped per project",
    desc: "Pair 8th Wall's open world tracking with our human tracking runtime — world-anchored scenes that also respond to the person in them.",
  },
];

export default function MigrationPage() {
  return (
    <main>
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          8th Wall migration & self-hosting
        </span>
        <h1 className="mt-4 max-w-[13ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          Your WebAR has a <span className="film-text">deadline</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          The hosted 8th Wall platform is gone, and published experiences stay
          online only until February 2027. I spent five years building at 8th
          Wall — I&apos;ll get your exported projects onto infrastructure you
          own.
        </p>
      </section>

      <section className="border-t border-[var(--hairline)]">
        <div className="grid gap-px bg-[var(--hairline)] md:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.n} className="bg-[var(--paper)] px-5 py-8">
              <p className="text-[clamp(24px,4vw,40px)] font-bold uppercase tracking-tight">
                {f.n}
              </p>
              <p className="mt-2 max-w-[36ch] text-[13.5px] leading-relaxed text-[var(--muted)]">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--hairline)]">
        {OFFERS.map((o) => (
          <div
            key={o.name}
            className="film-parent grid gap-2 border-b border-[var(--hairline)] px-5 py-8 md:grid-cols-[1fr_auto_1.1fr] md:items-baseline md:gap-8"
          >
            <h2 className="text-[clamp(22px,3.6vw,38px)] font-bold uppercase leading-[0.95] tracking-tight">
              <span className="film-hover">{o.name}</span>
            </h2>
            <span className="bk font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
              {o.price}
            </span>
            <p className="max-w-[56ch] text-[14px] leading-relaxed text-[var(--muted)]">
              {o.desc}
            </p>
          </div>
        ))}
      </section>

      <section className="border-t border-[var(--hairline)] px-5 py-14">
        {/* Set the recoverability expectation before the first call, not on it. */}
        <p className="max-w-[62ch] border-l-2 border-[var(--hairline)] pl-4 text-[13.5px] leading-relaxed text-[var(--muted)]">
          The honest caveat: 8th Wall&apos;s export tooling is no longer
          available. If a project was never exported before the platform
          retired, it can&apos;t be recovered — the first thing we&apos;ll do is
          confirm exactly what you have.
        </p>
      </section>

      <BriefCta
        heading="Send your project list"
        sub="Tell us what you published and what you exported. You'll get a straight answer on what's salvageable, what it costs, and how fast it can move."
        cta="Request a migration audit"
        subject="8th Wall migration audit"
      />
    </main>
  );
}
