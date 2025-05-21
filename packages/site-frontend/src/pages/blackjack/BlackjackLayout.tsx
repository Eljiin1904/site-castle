import { BlackjackLayoutBorder } from "./BlackjackLayoutBorder";
import { BlackjackPicture } from "./BlackjackPicture";
import { imagePaths, svgPaths } from "./utils/images";
import "./BlackjackLayout.scss";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
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

      {/* <SvgBlackjackBgGreen className="bg-green" /> */}
      {/* <SvgBlackjackBgDark className="bg-dark" /> */}
      <Img
        type="png"
        path={"/graphics/games/blackjack_board"}
        skeleton
        width="100%"
        aspectRatio={"16 / 9"}
        position="absolute"
      />

      {/* <BlackjackLayoutBorder /> */}

      {/* <BlackjackPicture
        className="logo-image"
        src={imagePaths.logo}
        alt="Castle Logo"
      /> */}
      {/* <SiteLogo /> */}
      {/* <Img
        path={"/games/blackjack/background/chicken-logo"}
        type="png"
        width="591"
        height="115"
      /> */}
      {/* <Vector
        as={SvgBlackjackChickenLogo}
        width={1000}
        height={1000}
      /> */}
    </div>
  );
};
