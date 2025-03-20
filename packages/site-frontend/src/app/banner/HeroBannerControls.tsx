import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
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
 
  const small = useIsMobileLayout();
  return (
    
    <Div
      display={hovered || small ? "flex" : "none"}
      position="absolute"
      left={small ? undefined: 0}
      style={{ right: '-1px' }}
      bottom={small ? 0: 4}
      center
      gap={small ? 0: 6}
    >
      {[...Array(slideCount)].map((x, i) => (
        <SlideSelector
          key={i}
          index={i}
          active={index === i}
          onClick={() => setIndex(i)}
        />
      ))}
    </Div>
  );
};

const SlideSelector = ({ index, active, onClick }: { index: number, active: boolean; onClick: () => void }) => {
  const small = useIsMobileLayout();
  const width = small ? 8 : (active ? 80 : 32);
  return (
    <Div
      py={8}
      pl={small && index === 0 ? 8 : 0}
      pr={small ? 8 : 0}
      hover="highlight"
      onClick={onClick}
      bg={small ? "black-hover" : undefined}
      border={false}
    >
      <Div
        width={width}
        height={8}
        bg={active ? "yellow" : "brown-4"}
        borderRadius={small ? undefined : 4}
        boxShadow={2}
      />
    </Div>
  );
};
