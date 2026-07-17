import type { Metadata } from "next";
import Link from "next/link";
import { BriefCta } from "components/studio-site/brief-cta";
import { ReelVideo } from "components/studio-site/reel-video";

export const metadata: Metadata = {
  title: "Virtual Try-On Development — Browser VTO for Ecommerce",
  description:
    "Custom virtual try-on for makeup, eyewear, earrings, and watches — in the browser, no app. Built on our own tracking engine with true ear, iris, and wrist anchors, by a former 8th Wall engineer.",
};

// The priority-keyword spoke (site architecture v2, call №2: ship now).
// Scoped to what's real: face-anchored VTO is supported today, wrist is live
// with demos landing. Apparel is explicitly out — the honesty rule is the
// credibility.

// Demo tiles: mp4s follow the reel workflow. Wrist capture lands at
// public/vto/studio-effect-wrist.mp4 (Evan uploads); eyewear is still in
// capture and renders the placeholder slab until a src is added.
const DEMOS: {
  name: string;
  items: string;
  tag: string;
  src?: string;
}[] = [
  {
    name: "Makeup",
    items: "Lips · Blush · Liner · Shadow",
    tag: "Rendered on the face mesh",
    src: "/face/studio-effect-makeup.mp4",
  },
  {
    name: "Earrings",
    items: "Earrings · Ear cuffs · Earbuds",
    tag: "True ear anchors — lobe, helix, canal",
    src: "/face/studio-effect-earrings.mp4",
  },
  {
    name: "Wrist",
    items: "Watches · Bracelets",
    tag: "6DoF wrist anchor",
    src: "/vto/studio-effect-wrist.mp4",
  },
  {
    name: "Eyewear",
    items: "Glasses · Sunglasses",
    tag: "Demo in capture",
  },
];

const CONVERT = [
  {
    label: "One tap from the product page",
    desc: "A link, button, or QR code opens the try-on in the shopper's mobile browser. No app store detour — the distance between browsing and wearing it is one tap.",
  },
  {
    label: "Private by architecture",
    desc: "All tracking runs on-device in the browser. Camera frames never leave the shopper's phone — a privacy line your legal team can approve in one read.",
  },
  {
    label: "Embeds where you sell",
    desc: "A script tag or hosted link drops into your product page — Shopify included. Opens, dwell time, and add-to-cart events wire into your existing analytics.",
  },
];

const ANCHORS = [
  {
    label: "Face",
    desc: "A 478-point expression-true mesh with metric head pose — makeup zones, eyewear with temples that reach real ears, headwear that holds through motion.",
  },
  {
    label: "Iris",
    desc: "Dedicated iris tracking for eye effects and contact-lens-class placement.",
  },
  {
    label: "Ear",
    desc: "True ear anchors — lobe, canal, and helix, per ear. Most face AR guesses ear positions from the face rim, and it shows.",
  },
  {
    label: "Wrist",
    desc: "6DoF wrist anchoring for watches, bracelets, and jewelry — the newest anchors in the engine, shipping through pilot engagements.",
  },
];

const FAQ = [
  {
    q: "Which products work with virtual try-on?",
    a: "Face-anchored products work today: makeup, eyewear, headwear, earrings, ear cuffs, and earbuds — plus watches and bracelets on the wrist. We don't offer apparel try-on: we track the body in metric 3D, but we don't simulate garment fit, sizing, or measurement.",
  },
  {
    q: "Do shoppers need to download an app?",
    a: "No. Try-on runs in the mobile browser — iOS Safari and Android Chrome — from a link, button, or QR code on the product page.",
  },
  {
    q: "How does it integrate with our store?",
    a: "As an embed on your product page: a script tag or a hosted link, Shopify included. Analytics events — opens, dwell, add-to-cart — wire into your existing stack.",
  },
  {
    q: "Is shopper camera video stored?",
    a: "No. All tracking runs on-device in the browser; camera frames never leave the shopper's phone.",
  },
  {
    q: "What does a try-on pilot cost?",
    a: "$7,500–15,000: one product category, integrated on your product page with analytics, after a 1–2 week technical prototype proves it on real phones.",
  },
];

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Virtual Try-On Development",
      serviceType: "Virtual try-on (WebAR) development for ecommerce",
      description:
        "Custom browser-based virtual try-on for makeup, eyewear, earrings, and watches — no app download. Built on an in-house tracking engine with face, iris, true ear, and wrist anchors.",
      provider: {
        "@type": "ProfessionalService",
        name: "Shape Reality",
        url: "https://shapereality.com",
        email: "evan@shapereality.com",
      },
      areaServed: "Worldwide",
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

export default function VirtualTryOnPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ── HERO ── */}
      <section className="px-5 pb-14 pt-32">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Virtual try-on
        </span>
        <h1 className="mt-4 max-w-[13ch] text-[clamp(40px,9vw,120px)] font-bold uppercase leading-[0.86] tracking-tight">
          Virtual try-on, <span className="film-text">without the app</span>
        </h1>
        <p className="mt-6 max-w-[50ch] text-[15px] leading-relaxed text-[var(--muted)]">
          Makeup, eyewear, earrings, watches — anchored to real anatomy, in
          metric 3D, on the shopper&apos;s own phone. Built on our in-house
          tracking engine and integrated where you actually sell: the product
          page.
        </p>
      </section>

      {/* ── DEMOS — live captures, placeholder slabs where pending ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-14">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          R&D demonstrations — captured live in the browser, unedited
        </span>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DEMOS.map((d) => (
            <figure
              key={d.name}
              className="relative aspect-[9/14] overflow-hidden border border-[var(--hairline)] bg-[var(--mist)]"
            >
              {d.src ? (
                <ReelVideo
                  src={d.src}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <>
                  <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[var(--muted)]" />
                  <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[var(--muted)]" />
                  <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[var(--muted)]" />
                  <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[var(--muted)]" />
                </>
              )}
              <figcaption
                className={
                  d.src
                    ? "absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8 text-white"
                    : "absolute inset-x-0 bottom-0 p-4"
                }
              >
                <p className="text-[clamp(22px,2.6vw,32px)] font-bold uppercase leading-[0.9] tracking-tight">
                  {d.name}
                </p>
                <p
                  className={`mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] ${d.src ? "text-white/80" : "text-[var(--muted)]"}`}
                >
                  {d.items}
                </p>
                <p
                  className={`mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${d.src ? "text-white/50" : "text-[var(--muted)]"}`}
                >
                  {d.tag}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── WHY BROWSER VTO CONVERTS ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          Why the browser
        </span>
        <h2 className="mt-4 max-w-[15ch] text-[clamp(28px,5.5vw,64px)] font-bold uppercase leading-[0.9] tracking-tight">
          Nothing between the shopper and the mirror
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {CONVERT.map((c) => (
            <div key={c.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">
                {c.label}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE ANCHORS — precision is the differentiator ── */}
      <section className="border-y border-[var(--hairline)] bg-black px-5 py-24 text-white">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">
          Powered by Reality Engine
        </span>
        <h2 className="mt-6 max-w-[14ch] text-[clamp(36px,7.5vw,110px)] font-bold uppercase leading-[0.84] tracking-tight">
          Anchored to real anatomy
        </h2>
        <div className="mt-12 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-4">
          {ANCHORS.map((a) => (
            <div key={a.label} className="bg-black p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                {a.label}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-white/90">
                {a.desc}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[52ch] text-[13.5px] leading-relaxed text-white/60">
          What we don&apos;t do: apparel try-on. We track the body in metric 3D,
          but we don&apos;t simulate garment fit, sizing, or measurement —{" "}
          <Link href="/solutions" className="film-ul [--ink:#fff] text-white">
            the full status table is public
          </Link>
          .
        </p>
      </section>

      {/* ── HOW A PILOT RUNS ── */}
      <section className="border-t border-[var(--hairline)] px-5 py-16">
        <span className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
          How a pilot runs
        </span>
        <h2 className="mt-4 max-w-[14ch] text-[clamp(28px,5.5vw,64px)] font-bold uppercase leading-[0.9] tracking-tight">
          One category, on your product page
        </h2>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-[var(--muted)]">
          A try-on pilot is $7,500–15,000: your product category, integrated on
          your product page with conversion analytics — after a 1–2 week
          technical prototype proves the tracking on real phones.{" "}
          <Link
            href="/services#pricing"
            className="film-ul font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--ink)]"
          >
            All pricing →
          </Link>
        </p>
      </section>

      {/* ── FAQ — mirrors the FAQPage schema ── */}
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
        heading="Put your product on real faces"
        sub="Start with a try-on feasibility sprint: your product category, our anchors, an honest read on what converts."
        cta="Book a try-on feasibility sprint"
        subject="Try-on feasibility sprint"
      />
    </main>
  );
}
