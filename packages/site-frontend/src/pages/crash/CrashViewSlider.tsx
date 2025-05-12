import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Img } from "@client/comps/img/Img";
import { CrashViewOverlay } from "./CrashViewOverlay";
// import "./DiceViewSlider.scss";

export const CrashViewSlider = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  
 
  const processing = useAppSelector((x) => x.crash.processing);  
  const sm = layout === "mobile";
  const dispatch = useAppDispatch();

  return (
    <Div
      className={classNames("CrashViewSlider")}
      fx
      grow
      center
      px={sm ? 16 : 40}
    >
      <Img
        type="jpg"
        path={"/graphics/crash-tile-overlay"}
        skeleton
        width="100%"
        aspectRatio={"16 / 9"}
        position="absolute"
      />
      <CrashViewOverlay />
    </Div>
  );
};