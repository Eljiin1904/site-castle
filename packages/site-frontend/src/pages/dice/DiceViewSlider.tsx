import classNames from "classnames";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Slider } from "@client/comps/slider/Slider";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";
import { Img } from "@client/comps/img/Img";
import { SvgSlider } from "#app/svgs/dice/SVgSlider";
import "./DiceViewSlider.scss";

export const DiceViewSlider = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const targetKind = useAppSelector((x) => x.dice.targetKind);
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const processing = useAppSelector((x) => x.dice.processing);
  const autoPlaying = useAppSelector((x) => x.dice.autoPlaying);
  const sm = layout === "mobile";
  const dispatch = useAppDispatch();

  return (
    <Div
      className={classNames("DiceViewSlider", targetKind)}
      fx
      grow
      center
      px={sm ? 16 : 40}
    >
      <Img
        type="jpg"
        path={"/graphics/dice-view-slider"}
        skeleton
        width="100%"
        aspectRatio={"16 / 9"}
        position="absolute"
      />
      <Slider
        type="single"
        min={1}
        max={10000}
        defaultValue={5000}
        disabled={processing || autoPlaying}
        value={targetValue}
        handleRender={(node) => (
          <div {...node.props}>
            <Div
              center
              bg="black-hover"
              p={16}
              width={40}
              height={40}
              borderRadius={"full"}
            >
              <Vector as={SvgSlider} />
              <TargetCard />
            </Div>
          </div>
        )}
        onChange={(x) => dispatch(Dice.setTargetValue(x))}
      />
    </Div>
  );
};

const TargetCard = () => {
  const targetValue = useAppSelector((x) => x.dice.targetValue);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile";
  return (
    <Div
      position="absolute"
      p={8}
      style={{
        top: "40px",
      }}
    >
      <Span
        fontFamily="title"
        color="dark-brown"
        lineHeight={24}
        fontWeight="regular"
        fontSize={24}
      >
        {Numbers.round(targetValue / 100, 2).toFixed(2)}
      </Span>
    </Div>
  );
};
