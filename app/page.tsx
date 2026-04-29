import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import { Hero } from "components/hero";
import Footer from "components/layout/footer";

export const metadata = {
  description:
    "WebAR puzzles & AR apparel with built-in image tracking. Scan to unlock 3D augmented reality experiences. No app required. Powered by 8th Wall.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
