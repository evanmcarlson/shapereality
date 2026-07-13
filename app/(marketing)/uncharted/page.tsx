import type { Metadata } from "next";
import { Hero } from "components/hero";
import Footer from "components/layout/footer";

// The original puzzle-first landing page, moved here from / when the
// studio homepage took over the root.
export const metadata: Metadata = {
  title: "Uncharted",
  description:
    "Shape Reality creates competitive puzzle games that combine physical jigsaw puzzles, timed completions, global leaderboards, and hidden AR experiences.",
  openGraph: {
    type: "website",
    title: "Shape Reality | Competitive Jigsaw Puzzle Games",
    description:
      "Shape Reality creates competitive puzzle games that combine physical jigsaw puzzles, timed completions, global leaderboards, and hidden AR experiences.",
  },
};

export default function UnchartedPage() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}
