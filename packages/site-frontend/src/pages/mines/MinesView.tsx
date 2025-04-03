import { Div } from "@client/comps/div/Div";
import { MinesGrid } from "./MinesGrid";
import { MinesWinCard } from "./MinesWinCard";

export const MinesView = () => {
  return (
    <Div
      fx
      center
      border
      bg="gray-8"
      overflow="hidden"
    >
      <MinesGrid />
      <MinesWinCard />
    </Div>
  );
};
