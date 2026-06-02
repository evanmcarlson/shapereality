import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { NavbarWrapper } from "components/layout/navbar/navbar-wrapper";
import { GeistMono } from "geist/font/mono";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} | WebAR Puzzles & Apparel Powered by 8th Wall`,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="relative bg-neutral-50 text-black selection:bg-black selection:text-white dark:bg-neutral-900 dark:text-white dark:selection:bg-white dark:selection:text-black font-mono uppercase">
        <CartProvider cartPromise={cart}>
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
