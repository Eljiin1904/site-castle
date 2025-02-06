import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { AutoStatusView } from "./AutoStatusView";
import { LimboHistory } from "./LimboHistory";
import { LimboViewMultiplier } from "./LimboViewMultiplier";
import { LimboViewFooter } from "./LimboViewFooter";

export const LimboView = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile";

  return (
    <Div
      fx
      column
      center
      border
      bg="brown-8"
      overflow="hidden"
      style={{
        height: sm ? "350px" : "608px",
      }}
    >
      <LimboHistory />
      <LimboViewMultiplier />
      <LimboViewFooter />
      <AutoStatusView />
    </Div>
  );
};
