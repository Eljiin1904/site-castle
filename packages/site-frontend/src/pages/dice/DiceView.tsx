import { Div } from "@client/comps/div/Div";
import { DiceViewSlider } from "./DiceViewSlider";
import { DiceViewFooter } from "./DiceViewFooter";
import { DiceHistory } from "./DiceHistory";
import { DiceViewResult } from "./DiceViewResult";
import { AutoStatusView } from "./AutoStatusView";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { DiceHeader } from "./DiceHeader";

export const DiceView = () => {
  const small = useIsMobileLayout();

  return (
    <Div
      fx
      column
      center
      border
      bg="brown-8"
      overflow="hidden"
      style={{
        height: small ? "350px" : "660px",
      }}
    >
      <Div
        fx
        position="relative"
        grow
      >
        <DiceHeader />
        {!small && <DiceHistory />}
        <DiceViewResult />
        <DiceViewSlider />
      </Div>
      <DiceViewFooter />
      <AutoStatusView />
    </Div>
  );
};
