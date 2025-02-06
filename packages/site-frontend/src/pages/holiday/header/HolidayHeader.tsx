import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FeatureGrid } from "./FeatureGrid";
import { HeaderTitle } from "./HeaderTitle";

export const HolidayHeader = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      column
      border
    >
      <Img
        type="jpg"
        path={`/events/christmas/winter-bg_${layout}`}
        width="100%"
        height={small ? "200px" : "400px"}
        skeleton
      />
      <Div
        position="absolute"
        fy
        fx
        column
        justify="flex-end"
      >
        <HeaderTitle />
        <FeatureGrid />
      </Div>
    </Div>
  );
};
