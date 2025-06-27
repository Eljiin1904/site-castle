import { Div } from "@client/comps/div/Div";
import { CrashViewSlider } from "./CrashViewSlider";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CrashHistory } from "./CrashHistory";
import { CrashHeader } from "./CrashHeader";
import { NetworkStatus } from "#app/comps/network-status/NetworkStatus";

export const CrashView = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);  
  const height = layout === "mobile" ? "500px" : (layout === "tablet" ? "550px" : "650px");
  
  return (
    <Div
      fx
      column
      center
      border
      bg="brown-8"
      overflow="hidden"
      style={{
        height:height,       
      }}
    >
      <Div fx position="relative" grow>
        <NetworkStatus />      
        <CrashHeader />
        <CrashHistory />
        <CrashViewSlider />
      </Div>
    </Div>
  );
};