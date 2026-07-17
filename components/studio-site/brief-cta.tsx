import { InquiryButton } from "components/studio-site/inquiry";

// Closing CTA band shared by the service/SEO pages. Every page ends the same
// way: one low-risk ask (the inquiry panel), the email in plain sight.
export function BriefCta({
  heading = "Have a brief? Send it over.",
  sub = "Tell us the campaign, the audience, and the deadline. You'll get an honest read on feasibility — and a fixed-price first step.",
  cta = "Send a project brief",
  subject = "Project brief",
}: {
  heading?: string;
  sub?: string;
  cta?: string;
  subject?: string;
}) {
  return (
    <section className="border-t border-[var(--hairline)] px-5 py-24 text-center">
      <h2 className="mx-auto max-w-[16ch] text-[clamp(30px,6vw,72px)] font-bold uppercase leading-[0.9] tracking-tight">
        {heading}
      </h2>
      <p className="mx-auto mt-5 max-w-[46ch] text-[14.5px] leading-relaxed text-[var(--muted)]">
        {sub}
      </p>
      <InquiryButton
        context={subject}
        className="film-parent group mt-8 inline-flex items-baseline gap-3 font-mono text-[14px] uppercase tracking-[0.16em]"
      >
        <span className="film-text font-bold">{cta}</span>
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </InquiryButton>
      <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-[var(--muted)]">
        evan@shapereality.com
      </p>
    </section>
  );
}
