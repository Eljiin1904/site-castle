import { useMemo } from "react";
import { HeroBannerSlideProps } from "./HeroBannerSlide";

export function useHeroSlides() {
  const slides: HeroBannerSlideProps[] = useMemo(
    () => [
      {
        type: "router",
        to: "/limbo",
        image: "/heroes/hero-banner",
        heading: "Play First Game Ever",
        description: "Play your first game and receive bonus tokens for  your other game!",
        button: "Start Playing",
      },
      {
        type: "router",
        to: "/crash",
        image: "/heroes/shitcoin-crash-banner",
        heading: "Shitcoin Crash",
        description: "Ride the pump and cash out before the dump!",
        button: "Play Crash",
      }
    ],
    [],
  );

  return slides;
}
