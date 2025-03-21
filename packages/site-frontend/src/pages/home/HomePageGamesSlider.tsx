import { CategoryBanner } from "#app/app/banner/CategoryBanner";
import { GameBanner } from "#app/app/banner/GameBanner";
import { ProviderBanner } from "#app/app/banner/ProviderBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgSliderArrow } from "@client/svgs/common/SvgSliderArrow";
import { SvgSliderArrowNext } from "@client/svgs/common/SvgSliderArrowNext";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";


export type GameSlideProps = {
  image: string,
  heading: string,
  subheading?: string,
  to: string
};

export const HomePageGamesSlider = ({title, items, type }: {
  title: string,
  items : GameSlideProps[],
  type: "category" | "game" | "provider"
}) => {

  const [index, setIndex] = useState(0);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const gap = layout === "mobile" ? 20 : 24;
  
  let slideElementsInDisplay = 6;
  switch(layout){
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

  return (<Div fx column  gap={layout === 'mobile' ? 24 : 40}
    mb={0}>
    <Div className="gameSectionHeader"
      fx alignItems="center" mt={layout === 'mobile' ? 0 : 16}>
      <PageTitle
        heading={title}
      />
      {items.length > slideElementsInDisplay && <Div className="gameSectionControls" gap={16}>
        <Button kind="tertiary-grey" size="md" icon={SvgSliderArrow} disabled={index === 0 } onClick={handlePrevious} />
        <Button kind="tertiary-grey" size="md" onClick={handleNext} disabled={index === items.length - slideElementsInDisplay} icon={SvgSliderArrowNext} />
      </Div>}
    </Div>
    <Div
     overflow="hidden"
     onMouseDown={swipe.onMouseDown}
    >
      <Div
        style={{
          transition: `left ${layout === 'mobile'? "0.5s" : "1s"} ease-in-out`,
          width: `100%`,
          left: `calc(-1*(100% - ${(slideElementsInDisplay-1)*gap}px)*${index}/${slideElementsInDisplay} - ${index}*${gap}px)`
        }}
        gap={layout === 'mobile' ? 20 : 24}
      >
        {items.map((x, i) => <Conditional
          value={type}
          key={`${type} ${title} ${x.heading}`}
          game={<GameBanner key={`${title} ${x.heading}`} ratio={layout === 'mobile' ? "150 / 160" : "168 / 180"} {...x}/>}
          provider={<ProviderBanner key={`${title} ${x.heading}`} image={x.image} />}
          category={<CategoryBanner ratio={layout === 'mobile'  ? "150 / 154" : "206 / 88"}  objectPositionHorizontal="80%" {...x}/>}
        />)}
      </Div>
    </Div>
  </Div>);
};