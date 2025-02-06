import { Div } from "@client/comps/div/Div";

export const HeroBannerControls = ({
  index,
  hovered,
  slideCount,
  setIndex,
}: {
  index: number;
  hovered: boolean;
  slideCount: number;
  setIndex: (i: number) => void;
}) => {
  return (
    <Div
      display={hovered ? "flex" : "none"}
      position="absolute"
      left={0}
      right={0}
      bottom={4}
      center
      gap={6}
    >
      {[...Array(slideCount)].map((x, i) => (
        <SlideSelector
          key={i}
          active={index === i}
          onClick={() => setIndex(i)}
        />
      ))}
    </Div>
  );
};

const SlideSelector = ({ active, onClick }: { active: boolean; onClick: () => void }) => {
  return (
    <Div
      py={8}
      hover="highlight"
      onClick={onClick}
    >
      <Div
        width={active ? 80 : 32}
        height={8}
        bg={active ? "yellow" : "brown-4"}
        borderRadius={4}
        boxShadow={2}
      />
    </Div>
  );
};
