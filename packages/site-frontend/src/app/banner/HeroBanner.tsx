import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useInterval } from "usehooks-ts";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { HeroBannerSlide } from "./HeroBannerSlide";
import { HeroBannerControls } from "./HeroBannerControls";
import { useHeroSlides } from "./useHeroSlides";
import "./HeroBanner.scss";

export const HeroBanner = () => {
  const delay = 8000;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const slides = useHeroSlides();
  const layout = useAppSelector((x) => x.style.mainLayout);

  const handlePrevious = () => {
    setIndex((i) => (i - 1 < 0 ? slides.length - 1 : i - 1));
  };

  const handleNext = () => {
    setIndex((i) => (i + 1 === slides.length ? 0 : i + 1));
  };

  const swipe = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  useInterval(handleNext, hovered ? null : delay);

  return (
    <Div
      className="HeroBanner"
      forwardRef={swipe.ref}
      column
      fx
      overflow="hidden"
      onMouseDown={swipe.onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Div
        style={{
          transition: `left ${layout === "mobile" ? "0.5s" : "1s"} ease-in-out`,
          width: `${100 * slides.length}%`,
          left: `-${index * 100}%`,
        }}
      >
        {slides.map((x, i) => (
          <HeroBannerSlide
            key={i}
            {...x}
          />
        ))}
      </Div>
      <HeroBannerControls
        index={index}
        hovered={hovered}
        slideCount={slides.length}
        setIndex={setIndex}
      />
    </Div>
  );
};
