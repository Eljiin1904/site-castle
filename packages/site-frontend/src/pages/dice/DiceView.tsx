import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DiceViewSlider } from "./DiceViewSlider";
import { DiceViewFooter } from "./DiceViewFooter";
import { DiceHistory } from "./DiceHistory";
import { DiceViewResult } from "./DiceViewResult";
import { AutoStatusView } from "./AutoStatusView";

export const DiceView = () => {
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
      <DiceHistory />
      <DiceViewResult />
      <DiceViewSlider />
      <DiceViewFooter />
      <AutoStatusView />
    </Div>
  );
};
