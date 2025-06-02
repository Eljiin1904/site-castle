import { Div } from "@client/comps/div/Div";
import { AutoStatusView } from "./AutoStatusView";
import { LimboHistory } from "./LimboHistory";
import { LimboViewMultiplier } from "./LimboViewMultiplier";
import { LimboViewFooter } from "./LimboViewFooter";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { LimboHeader } from "./LimboHeader";

export const LimboView = () => {
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
        <LimboHeader />
        {!small && <LimboHistory />}
        <LimboViewMultiplier />
      </Div>
      <LimboViewFooter />
      <AutoStatusView />
    </Div>
  );
};
