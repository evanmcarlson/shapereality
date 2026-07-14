import Image from "next/image";
import Link from "next/link";

const CONTACT = "mailto:evan@shapereality.com?subject=Project%20brief";

// Shape Reality v1 shell: adaptive paper/ink (same scheme as /uncharted),
// constant 20px frame, mono bracket labels, film accents on interaction.
// Nav mirrors the conversion path: services → proof → the two audience pages.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="sticky top-0 z-50 bg-[var(--paper)]/90 backdrop-blur">
        <div className="flex items-center justify-between px-5 py-5">
          <Link href="/" aria-label="Shape Reality home">
            <Image
              src="/wordmark2.png"
              alt="Shape Reality"
              width={120}
              height={14}
              style={{
                width: "auto",
                height: "26px",
                filter: "invert(var(--logo-invert))",
              }}
            />
          </Link>
          <nav className="flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.16em]">
            <a
              href="/#tryon"
              className="film-ul hidden text-[var(--muted)] transition-colors hover:text-[var(--ink)] sm:block"
            >
              Try-on
            </a>
            <a
              href="/#services"
              className="film-ul hidden text-[var(--muted)] transition-colors hover:text-[var(--ink)] sm:block"
            >
              Services
            </a>
            <a
              href="/#work"
              className="film-ul hidden text-[var(--muted)] transition-colors hover:text-[var(--ink)] sm:block"
            >
              Work
            </a>
            <Link
              href="/webar-for-agencies"
              className="film-ul hidden text-[var(--muted)] transition-colors hover:text-[var(--ink)] md:block"
            >
              Agencies
            </Link>
            <Link
              href="/8th-wall-migration"
              className="film-ul hidden text-[var(--muted)] transition-colors hover:text-[var(--ink)] md:block"
            >
              8th Wall
            </Link>
            <a
              href={CONTACT}
              className="rounded-full border border-[var(--hairline)] px-4 py-2 text-[var(--ink)] transition-colors hover:border-[var(--ink)]"
            >
              Start a project
            </a>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-[var(--hairline)]">
        <div className="grid gap-8 px-5 py-10 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-3">
            <p className="bk font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)]">
              Shape Reality — San Francisco — 2026
            </p>
            <a
              href={CONTACT}
              className="film-ul self-start font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              evan@shapereality.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] sm:grid-cols-3">
            <Link
              href="/webar-body-tracking"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Body tracking
            </Link>
            <Link
              href="/webar-face-filters"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Face & accessories
            </Link>
            <Link
              href="/8th-wall-migration"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              8th Wall migration
            </Link>
            <Link
              href="/webar-for-agencies"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              For agencies
            </Link>
            <Link
              href="/uncharted"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Uncharted
            </Link>
            <a
              href="https://www.instagram.com/weshapereality"
              target="_blank"
              rel="noreferrer"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Instagram
            </a>
            <a
              href="https://shapereality.com/privacy"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Privacy
            </a>
            <a
              href="https://shapereality.com/terms"
              className="film-ul text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
