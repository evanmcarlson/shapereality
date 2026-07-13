import { CartProvider } from "components/cart/cart-context";
import { MetaPixelPageView } from "components/analytics/meta-pixel-page-view";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";

const generalSans = localFont({
  src: "../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
});

const { SITE_NAME } = process.env;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} | AR Studio — San Francisco`,
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
    <html lang="en" className={`${GeistMono.variable} ${generalSans.variable}`}>
      <body className="relative bg-neutral-50 text-black selection:bg-black selection:text-white dark:bg-neutral-900 dark:text-white dark:selection:bg-white dark:selection:text-black">
        <CartProvider cartPromise={cart}>
          <main>
            {children}
            <Toaster closeButton />
          </main>
        </CartProvider>
        <Suspense fallback={null}>
          <MetaPixelPageView />
        </Suspense>
        <Analytics />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1330286598467636');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1330286598467636&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GLQ8LDZFDD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GLQ8LDZFDD');
          `}
        </Script>
      </body>
    </html>
  );
}
