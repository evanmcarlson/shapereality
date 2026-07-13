import MobileMenu from "components/layout/navbar/mobile-menu";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const navItems = [
  { title: "Uncharted", path: "/uncharted" },
  { title: "Shop", path: "/product/uncharted" },
  { title: "Leaderboard", path: "/uncharted#leaderboard" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="mx-auto w-full max-w-120 flex items-center justify-between px-4">
          <Link href="/">
            <Image
              src="/wordmark2.png"
              alt="Shape Reality"
              width={120}
              height={14}
              style={{
                width: "auto",
                height: "34px",
                filter: "invert(var(--logo-invert))",
              }}
            />
          </Link>

          <div className="block md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={navItems} />
            </Suspense>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="font-mono text-xs uppercase tracking-widest text-black dark:text-white opacity-60 hover:opacity-100 transition-opacity"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </>
  );
}
