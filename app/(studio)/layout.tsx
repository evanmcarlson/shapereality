import Image from "next/image";
import Link from "next/link";

const CONTACT = "mailto:evan@shapereality.com?subject=Project%20inquiry";

// Always-dark chrome for the studio homepage. /uncharted keeps the
// (marketing) layout and all of its existing styles.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F2F0EB]">
      <header className="absolute top-0 left-0 right-0 z-50 py-5">
        <div className="mx-auto flex w-full max-w-[1120px] items-center justify-between px-6 md:px-10">
          <Link href="/">
            <Image
              src="/wordmark2.png"
              alt="Shape Reality"
              width={120}
              height={14}
              style={{ width: "auto", height: "30px" }}
            />
          </Link>
          <nav className="flex items-center gap-6">
            <a
              href="/#work"
              className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.18em] text-[#75757F] hover:text-[#F2F0EB] transition-colors"
            >
              Work
            </a>
            <Link
              href="/uncharted"
              className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.18em] text-[#75757F] hover:text-[#F2F0EB] transition-colors"
            >
              Uncharted
            </Link>
            <a
              href={CONTACT}
              className="rounded-full border border-[#2E2E38] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F2F0EB] hover:border-[#F2F0EB] transition-colors"
            >
              Start a project
            </a>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#1F1F27]">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#75757F]">
            © 2026 Shape Reality, LLC — San Francisco
          </p>
          <div className="flex gap-6 font-mono text-[11px] uppercase tracking-[0.18em]">
            <a href="https://www.instagram.com/weshapereality" target="_blank" rel="noreferrer" className="text-[#75757F] hover:text-[#F2F0EB] transition-colors">
              Instagram
            </a>
            <a href="https://shapereality.com/privacy" className="text-[#75757F] hover:text-[#F2F0EB] transition-colors">
              Privacy
            </a>
            <a href="https://shapereality.com/terms" className="text-[#75757F] hover:text-[#F2F0EB] transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
