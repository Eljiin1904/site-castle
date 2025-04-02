import { memo } from "react";
import classNames from "classnames";
import { MinesMode } from "#core/types/mines/MinesMode";
import { Div } from "#client/comps/div/Div";
import { Img } from "#client/comps/img/Img";
import { SvgChicken } from "#client/svgs/common/SvgChicken";
import { Vector } from "#client/comps/vector/Vector";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { SvgAnimation } from "./SvgAnimation";
import "./MinesGridCard.scss";

type MinesGridCardProps = {
  index: number;
  mode: MinesMode;
  hasGame: boolean | undefined;
  completed: boolean | undefined;
  revealed: boolean | undefined;
  mined: boolean | undefined;
  autoSelected: boolean | undefined;
  queued: boolean | undefined;
  animating: boolean | undefined;
};

export const MinesGridCard = memo<MinesGridCardProps>((props) => {
  const { index, mode, hasGame, completed, mined, revealed, autoSelected, queued, animating } =
    props;
  const dispatch = useAppDispatch();

  const autoMode = mode === "auto";
  const visible = revealed || completed;
  const disabled = (!hasGame && !autoMode) || queued || completed || revealed;

  const handleClick = () => {
    if (autoMode) {
      dispatch(Mines.addAutoIndex(index));
    } else {
      dispatch(Mines.enqueueReveal(index));
    }
  };

  return (
    <Div
      className={classNames("MinesGridCard", {
        auto: autoSelected,
        visible,
        revealed,
        mined,
        disabled,
        animating,
        queued,
      })}
      fy
      fx
      center
      bg="gray-6"
      border
      disabledSelect
      onClick={disabled ? undefined : handleClick}
    >
      <StateIcon
        visible={visible}
        mined={mined}
        revealed={revealed}
        animating={animating}
      />
    </Div>
  );
});

const StateIcon = ({
  visible,
  mined,
  revealed,
  animating,
}: {
  visible: boolean | undefined;
  mined: boolean | undefined;
  revealed: boolean | undefined;
  animating: boolean | undefined;
}) => {
  if (animating) {
    return (
      <Vector
        className="animation"
        as={SvgAnimation}
        color="gold"
        width="70%"
        height="70%"
      />
    );
  } else if (mined) {
    return (
      <Img
        className="icon"
        type="png"
        path={revealed ? "/icons/mines-bomb" : "/icons/mines-bomb-ns"}
        width="100%"
      />
    );
  } else if (visible) {
    return (
      <Img
        className="icon"
        type="png"
        path={revealed ? "/icons/mines-gem" : "/icons/mines-gem-ns"}
        width="100%"
      />
    );
  } else {
    return (
      <Vector
        as={SvgChicken}
        color="gray-4"
        width="70%"
        height="70%"
      />
    );
  }
};
