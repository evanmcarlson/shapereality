import type { Metadata } from "next";
import Link from "next/link";
import { BriefCta } from "components/studio-site/brief-cta";

export const metadata: Metadata = {
  title: "WebAR Development Services & Consulting",
  description:
    "Senior WebAR development, virtual try-on builds, consulting, and white-label engineering — freelance-friendly, direct with a former 8th Wall engineer. Projects from $5k.",
};

// The offer hub (site architecture v2). One job: make the $5–25k buyer feel
// the gap close — agency-grade engineering, founder-direct, priced where they
// live. Pricing is published on purpose: it's the loudest "we are not the
// $50k agency" signal, and it pre-filters leads into the band we want.

const SERVICE_LINES = [
  {
    name: "WebAR experiences",
    desc: "Campaigns, activations, games, and installations — any web-based AR, concept to launch. Body-tracked effects, face filters, world tracking, custom 3D scenes.",
    href: "/solutions",
    link: "What we build on",
  },
  {
    name: "Virtual try-on",
    desc: "Makeup, eyewear, earrings, watches — designed, built, and integrated into your product page. One tap from browsing to wearing it.",
    href: "/virtual-try-on",
    link: "More",
  },
  {
    name: "Consulting & feasibility",
    desc: "Architecture reviews, feasibility audits, and rescue work on stuck immersive builds. Bring an idea with no spec, or a project that isn't shipping — you'll get an engineering read either way.",
  },
  {
    name: "White-label delivery",
    desc: "Every engagement can ship under your brand: your repo, your deck, your client relationship. NDA-comfortable, credit optional.",
    href: "/webar-for-agencies",
    link: "How white-label works",
  },
  {
    name: "Post-launch support",
    desc: "Browser and device updates, performance monitoring, device-matrix QA, new effects on the same anchors. WebAR that keeps running after the campaign ships.",
  },
];

const PRICING = [
  {
    name: "Feasibility audit",
    range: "$500–1,000",
    desc: "A written engineering read on your idea: what tracks, what doesn't, and what it would cost to build.",
  },
  {
    name: "Technical prototype",
    range: "$2,000–4,000",
    desc: "1–2 weeks. The core interaction on real phones, with a recorded stability report.",
  },
  {
    name: "Branded activation",
    range: "$5,000–12,000",
    desc: "A full campaign experience: effect, UI, capture and share, analytics, device QA matrix.",
  },
  {
    name: "Virtual try-on pilot",
    range: "$7,500–15,000",
    desc: "One product category, integrated on your product page, with conversion analytics.",
  },
  {
    name: "Body campaign / AR mirror",
    range: "$10,000–25,000+",
    desc: "Full-body tracked experiences and installations — the least crowded category and our strongest proof.",
  },
  {
    name: "Post-launch maintenance",
    range: "from $750/mo",
    desc: "Updates, monitoring, and iteration on a monthly retainer.",
  },
];

const FAQ = [
  {
    q: "Do you take freelance and contract work?",
    a: "Yes. Shape Reality is an independent studio — engagements run as fixed-price project milestones or contract sprints, directly with the founder. No account layer, no bench.",
  },
  {
    q: "What does a WebAR project cost?",
    a: "Published ranges: feasibility audits from $500, technical prototypes $2,000–4,000, branded activations $5,000–12,000, virtual try-on pilots $7,500–15,000, body-tracked campaigns $10,000–25,000+. Most projects land between $5k and $25k.",
  },
  {
    q: "Is the work white label?",
    a: "Everything can ship under your brand: your repo, your deck, your client relationship. NDA-comfortable, credit optional.",
  },
  {
    q: "What do you build on?",
    a: "Our own Reality Engine for body, face, iris, ear, and wrist tracking; 8th Wall's open-source stack for SLAM world tracking, sky segmentation, and image targets; three.js and WebXR throughout.",
  },
  {
    q: "Do you work with agencies?",
    a: "Yes — as the white-label engineering layer behind your creative direction. You keep the client and the credit.",
  },
];

// ProfessionalService + FAQPage schema. The FAQ answers double as the
// long-tail SEO surface ("freelance webar developer", "webar project cost").
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "Shape Reality",
      url: "https://shapereality.com",
      email: "evan@shapereality.com",
      description:
        "Senior WebAR development studio: virtual try-on, body-tracked AR campaigns, consulting, and white-label engineering — built on an in-house tracking engine by a former 8th Wall engineer.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
      areaServed: "Worldwide",
      priceRange: "$500–$25,000+",
      founder: {
        "@type": "Person",
        name: "Evan Carlson",
        jobTitle: "Founder",
        description:
          "Creative technologist; five-plus years at 8th Wall and Niantic as a Solutions Engineer supporting production WebAR.",
      },
      makesOffer: SERVICE_LINES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.desc },
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ── HERO ── */}
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Services
        </span>
        <h1 className="mt-4 max-w-[13ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          Senior WebAR, <span className="film-text">direct</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Shape Reality designs and builds web-based AR end to end — virtual
          try-on, body-tracked campaigns, face effects, world tracking — and
          consults on immersive projects at any stage. Agency-grade engineering
          without the agency between us, from $5k. Everything ships white label.
        </p>
      </section>

      {/* ── THE OPERATOR — the bio is the trust argument ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          <span className="bk h-fit font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
            The operator
          </span>
          <div className="max-w-[62ch]">
            <p className="text-[17px] leading-relaxed">
              Shape Reality is run by Evan Carlson, a creative technologist with
              five-plus years at 8th Wall and Niantic as a Solutions Engineer —
              supporting the developers, agencies, and global brands shipping
              production WebAR. He spent those years inside premium campaigns:
              debugging tracking issues, implementing features, getting launches
              out the door on deadline.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--muted)]">
              Now he builds them end to end — 8th Wall, three.js, WebXR; image
              targets, face effects, world tracking, custom 3D scenes — on
              tracking infrastructure the studio owns. The engineer on the
              kickoff call is the one writing the code.
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICE LINES — six rows, homepage pattern ── */}
      <section className="border-t border-[var(--hairline)]">
        {SERVICE_LINES.map((s) => {
          const body = (
            <>
              <h2 className="text-[clamp(24px,4.5vw,52px)] font-bold uppercase leading-[0.9] tracking-tight">
                <span className={s.href ? "film-hover" : undefined}>
                  {s.name}
                </span>
              </h2>
              <div>
                <p className="max-w-[54ch] text-[14px] leading-relaxed text-[var(--muted)]">
                  {s.desc}
                </p>
                {s.href ? (
                  <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
                    {s.link} <span aria-hidden="true">→</span>
                  </span>
                ) : null}
              </div>
            </>
          );
          const rowClass =
            "grid gap-3 border-b border-[var(--hairline)] px-5 py-9 md:grid-cols-[1.1fr_1fr] md:items-baseline";
          return s.href ? (
            <Link
              key={s.name}
              href={s.href}
              className={`film-parent group ${rowClass}`}
            >
              {body}
            </Link>
          ) : (
            <div key={s.name} className={rowClass}>
              {body}
            </div>
          );
        })}
      </section>

      {/* ── ENGAGEMENT MODEL ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          How engagements run
        </span>
        <h2 className="mt-4 max-w-[14ch] text-[clamp(28px,5.5vw,64px)] font-bold uppercase leading-[0.9] tracking-tight">
          Prototype first
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Start with a 1–2 week technical prototype. If the interaction and
          device performance pass, continue into production. Fixed price per
          milestone, one senior contact throughout, source code handed over.
        </p>
      </section>

      {/* ── PRICING — published on purpose ── */}
      <section
        id="pricing"
        className="border-t border-[var(--hairline)] px-5 py-16"
      >
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Pricing
        </span>
        <h2 className="mt-4 max-w-[14ch] text-[clamp(28px,5.5vw,64px)] font-bold uppercase leading-[0.9] tracking-tight">
          Numbers, in print
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Most projects land between $5k and $25k. Every engagement is
          fixed-price per milestone and white label by default.
        </p>
        <div className="mt-10">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className="grid gap-2 border-b border-[var(--hairline)] py-6 md:grid-cols-[1fr_auto] md:items-baseline"
            >
              <div>
                <h3 className="text-[clamp(18px,2.6vw,26px)] font-bold uppercase tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-1 max-w-[56ch] text-[13.5px] leading-relaxed text-[var(--muted)]">
                  {p.desc}
                </p>
              </div>
              <span className="font-mono text-[14px] tracking-[0.06em] tabular-nums md:text-right">
                {p.range}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ — mirrors the FAQPage schema above ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Questions, answered straight
        </span>
        <div className="mt-8 max-w-[72ch]">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group border-b border-[var(--hairline)] py-5"
            >
              <summary className="cursor-pointer list-none text-[16px] font-bold uppercase tracking-tight [&::-webkit-details-marker]:hidden">
                <span
                  aria-hidden="true"
                  className="mr-3 inline-block font-mono text-[12px] text-[var(--muted)] transition-transform group-open:rotate-45"
                >
                  +
                </span>
                {f.q}
              </summary>
              <p className="mt-3 max-w-[62ch] pl-7 text-[14px] leading-relaxed text-[var(--muted)]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <BriefCta
        heading="Send a project brief"
        sub="Tell us the idea, the deadline, and the budget band. You'll get an engineering read, not a sales call."
      />
    </main>
  );
}
