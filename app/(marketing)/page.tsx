import type { Metadata } from "next";
import { Hero } from "components/hero";
import Footer from "components/layout/footer";

// Kept for use elsewhere:
// import { HeroScrollSection } from "components/hero-scroll-section";
// import { TicketSection } from "components/ticket-section";
// import { CTASection } from "components/cta-section";
// import { Carousel } from "components/carousel";
// import { ThreeItemGrid } from "components/grid/three-items";

export const metadata: Metadata = {
  description:
    "Shape Reality creates competitive puzzle games that combine physical jigsaw puzzles, timed completions, global leaderboards, and hidden AR experiences.",
  openGraph: {
    type: "website",
    title: "Shape Reality | Competitive Jigsaw Puzzle Games",
    description:
      "Shape Reality creates competitive puzzle games that combine physical jigsaw puzzles, timed completions, global leaderboards, and hidden AR experiences.",
  },
  other: {
    "facebook-domain-verification": "xuzr5hg47f0ub5k59e2jti2oewntrq",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}
