import CartModal from "components/cart/modal";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";

const navItems = [
  { title: "Home", path: "/" },
  { title: "Uncharted", path: "/uncharted" },
  { title: "Leaderboard", path: "/uncharted#leaderboard" },
];

export async function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 py-4">
      <div className="mx-auto w-full max-w-120 grid grid-cols-3 items-center px-4 md:flex md:justify-between">
        {/* Mobile only: hamburger left */}
        <div className="flex justify-start md:hidden">
          <Suspense fallback={null}>
            <MobileMenu
              menu={navItems}
              buttonClassName="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
            />
          </Suspense>
        </div>

        {/* Logo: centered on mobile, left on desktop */}
        <div className="flex justify-center md:justify-start">
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
        </div>

        {/* Right: bag always visible; nav links desktop only */}
        <nav className="flex justify-end items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              prefetch={true}
              className="hidden md:block font-mono text-xs uppercase tracking-widest text-black dark:text-white opacity-60 hover:opacity-100 transition-opacity"
            >
              {item.title}
            </Link>
          ))}
          <CartModal />
        </nav>
      </div>
    </header>
  );
}
