import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import "./AppMaintenanceOverlay.scss";

export const AppMaintenanceOverlay = () => {
  return (
    <Div
      className="AppMaintenanceOverlay"
      position="absolute"
      fx
      fy
      center
    >
      <Div
        position="absolute"
        left={0}
        right={0}
        bottom={2}
        center
      >
        <Span
          size={12}
          color="white"
        >
          {"Maintenance Mode"}
        </Span>
      </Div>
    </Div>
  );
};
