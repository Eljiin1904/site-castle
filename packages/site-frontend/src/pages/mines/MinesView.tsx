import { Div } from "@client/comps/div/Div";
import { MinesGrid } from "./MinesGrid";
import { MinesWinCard } from "./MinesWinCard";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Img } from "@client/comps/img/Img";
import { MinesHistory } from "./MinesHistory";

export const MinesView = () => {
  
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
        <Img
          type="jpg"
          path={"/graphics/mines_grid"}
          skeleton
          width="100%"
          aspectRatio={"16 / 9"}
          position="absolute"
        />   
        {!small && <MinesHistory />}   
        <MinesGrid />
        <MinesWinCard />
      </Div>
    );
};
