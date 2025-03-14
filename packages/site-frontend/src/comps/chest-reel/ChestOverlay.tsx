import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import "./ChestOverlay.scss";
import classNames from "classnames";

export const ChestOverlay = ({position}: {
  position: "top" | "bottom" | "left" | "right";
}) => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (<Div position="absolute" fx className={classNames("ChestOverlay",position)}></Div>)
};