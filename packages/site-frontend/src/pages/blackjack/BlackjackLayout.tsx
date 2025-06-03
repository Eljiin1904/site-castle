import { svgPaths } from "./utils/images";
import "./BlackjackLayout.scss";
import { Img } from "@client/comps/img/Img";

export const BlackjackLayout = () => {
  return (
    <div className="BlackjackLayout">
      <img
        src={svgPaths.bgGreen}
        alt="Blackjack Table"
        className="bg-green"
      />
      <img
        src={svgPaths.bgDark}
        alt="Blackjack Table"
        className="bg-dark"
      />

      <Img
        type="png"
        path={"/graphics/games/blackjack_board"}
        skeleton
        width="100%"
        aspectRatio={"16 / 9"}
        position="absolute"
      />
    </div>
  );
};
