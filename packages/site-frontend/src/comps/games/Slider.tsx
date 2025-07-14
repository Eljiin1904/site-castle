import { CategoryBanner } from "#app/app/banner/CategoryBanner";
import { GameBanner } from "#app/app/banner/GameBanner";
import { ProviderBanner } from "#app/app/banner/ProviderBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { GameHubEight } from "#app/pages/games/GameHubEight";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgSliderArrow } from "@client/svgs/common/SvgSliderArrow";
import { SvgSliderArrowNext } from "@client/svgs/common/SvgSliderArrowNext";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export type SlideProps = {
  image: string;
  heading: string;
  subheading?: string;
  to: string;
};

export const Slider = ({
  title,
  items,
  type,
}: {
  title: string;
  items: SlideProps[];
  type: "category" | "game" | "provider" | "hub-eight";
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const [index, setIndex] = useState(0);
  const gap = layout === "mobile" ? 20 : 24;

  let slideElementsInDisplay = 6;
  switch (layout) {
    case "mobile":
      slideElementsInDisplay = 2;
      break;
    case "tablet":
      slideElementsInDisplay = 4;
      break;
    case "laptop":
      slideElementsInDisplay = 5;
      break;
  }

  const handlePrevious = () => {
    setIndex((i) => (i - 1 < 0 ? items.length - 1 : i - 1));
  };

  const handleNext = () => {
    setIndex((i) => (i + 1 === items.length ? 0 : i + 1));
  };

  const swipe = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (
    <Div
      fx
      column
      gap={layout === "mobile" ? 24 : 40}
    >
      <Div
        alignItems="center"
        fx
      >
        {title && <PageTitle heading={title} />}
        {items.length > slideElementsInDisplay && (
          <Div
            className="gameSectionControls"
            gap={16}
          >
            <Button
              kind="tertiary-grey"
              size="md"
              icon={SvgSliderArrow}
              disabled={index === 0}
              onClick={handlePrevious}
            />
            <Button
              kind="tertiary-grey"
              size="md"
              onClick={handleNext}
              disabled={index === items.length - slideElementsInDisplay}
              icon={SvgSliderArrowNext}
            />
          </Div>
        )}
      </Div>
      <Div
        overflow="hidden"
        onMouseDown={swipe.onMouseDown}
      >
        <Div
          style={{
            transition: `left ${layout === "mobile" ? "0.5s" : "1s"} ease-in-out`,
            width: `100%`,
            left: `calc(-1*(100% - ${(slideElementsInDisplay - 1) * gap}px)*${index}/${slideElementsInDisplay} - ${index}*${gap}px)`,
          }}
          gap={layout === "mobile" ? 20 : 24}
        >
          {items.map((x, i) => (
            <Conditional
              value={type}
              key={`${type} ${title} ${x.heading}`}
              hub-eight={
                <GameHubEight
                  image={x.image ?? undefined}
                  heading={x.heading}
                  to={x.to}
                  subheading={x.subheading}
                />
              }
              game={
                <GameBanner
                  objectPositionHorizontal="right"
                  ratio={layout === "mobile" ? "150 / 160" : "168 / 180"}
                  {...x}
                />
              }
              provider={<ProviderBanner image={x.image} />}
              category={
                <CategoryBanner
                  ratio={layout === "mobile" ? "150 / 154" : "206 / 88"}
                  objectPositionHorizontal="80%"
                  {...x}
                />
              }
            />
          ))}
        </Div>
      </Div>
    </Div>
  );
};
