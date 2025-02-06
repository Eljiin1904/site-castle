import { useMemo } from "react";
import { HeroBannerSlideProps } from "./HeroBannerSlide";

export function useHeroSlides() {
  const slides: HeroBannerSlideProps[] = useMemo(
    () => [
      {
        type: "router",
        to: "/limbo",
        image: "/heroes/hero-banner",
        button: "Start Playing",
      },
    ],
    [],
  );

  return slides;
}
