import { memo } from "react";
import classNames from "classnames";
import { MinesMode } from "@core/types/mines/MinesMode";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Vector } from "@client/comps/vector/Vector";
import { Mines } from "#app/services/mines";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { SvgAnimation } from "./SvgAnimation";
import { SvgDiamond } from "#app/svgs/mines/SvgDiamond";
import "./MinesGridCard.scss";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

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
  const small = useIsMobileLayout();
  const gridSize = useAppSelector((x) => x.mines.gridSize);
 
  const padding = Math.min((small ? 8: 16) * 4 / gridSize, 16);
  const widthAndHeight = Math.min(Math.max(40, 40 * gridSize / 6), 70);
 
  if (animating) {
    return (
      <Vector
        className="animation"
        as={SvgAnimation}
        color="sand"
        width={`${widthAndHeight}%`}
        height={`${widthAndHeight}%`}
      />
    );
  } else if (mined) {
    return (
      <Img
        className="icon"
        type="png"
        path={revealed ? "/icons/mines-bomb" : "/icons/mines-bomb-ns"}
        width="100%"
        style={{ padding: `${padding}px` }}
      />
    );
  } else if (visible) {
    return (
      <Img
        className="icon"
        type="png"
        path={revealed ? "/icons/mines-gem" : "/icons/mines-gem-ns"}
        width="100%"
        style={{ padding: `${padding}px` }}
      />
    );
  } else {
    return (
      <Vector
        className="icon"
        color="dark-brown-hover"
        as={SvgDiamond}
        width={`${widthAndHeight}%`}
        height={`${widthAndHeight}%`}
      />
    );
  }
};
