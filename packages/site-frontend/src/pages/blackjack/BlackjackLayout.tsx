import { BlackjackLayoutBorder } from "./BlackjackLayoutBorder";
import { BlackjackPicture } from "./BlackjackPicture";
import { imagePaths, svgPaths } from "./utils/images";
import "./BlackjackLayout.scss";

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

      <BlackjackLayoutBorder />

      <BlackjackPicture
        className="logo-image"
        src={imagePaths.logo}
        alt="Chicken Logo"
      />
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
