import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Img } from "@client/comps/img/Img";
import { CrashViewOverlay } from "./CrashViewOverlay";
import { CrashGrid } from "#app/comps/crash/CrashGrid";

export const CrashViewSlider = () => {
  
  const layout = useAppSelector((x) => x.style.mainLayout);  
  const scale = layout === 'mobile' ? 0.85 : (layout === 'tablet' ? 1.1 : 1);
  return (
    <Div
      className={classNames("CrashViewSlider")}
      fx
      grow
      center
      px={layout === 'mobile' || layout == 'tablet' ? 16 : 40}
      bg="dark-brown"
      style={{ transform: `scale(${scale})`}}
    >
      <CrashGrid />
      <Img
        type="png"
        path={"/graphics/crash-tile-overlay"}
        skeleton
        width={"852px"}
        height="full"
        objectFit="cover"
        position="absolute"
      />
      <CrashViewOverlay />
    </Div>
  );
};