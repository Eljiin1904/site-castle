import { Div } from "@client/comps/div/Div";
import { SvgMenu } from "@client/svgs/common/SvgMenu";
import { SvgMedal } from "@client/svgs/common/SvgMedal";
import { SvgHeadset } from "@client/svgs/common/SvgHeadset";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgChat } from "@client/svgs/common/SvgChat";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Chat } from "#app/services/chat";
import { Site } from "#app/services/site";
import { MenuItem } from "./bar/MenuItem";
import "./AppMenuBar.scss";

export const AppMenuBar = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  if (["laptop", "desktop"].includes(layout)) {
    return null;
  }

  return <BarContent />;
};

const BarContent = () => {
  const menuOpen = useAppSelector((x) => x.site.menuOverlayOpen);
  const chatOpen = useAppSelector((x) => x.chat.overlayOpen);
  const intercom = useIntercomManager();
  const dispatch = useAppDispatch();

  return (
    <Div
      className="AppMenuBar"
      fx
      borderTop
    >
      <MenuItem
        id="menu-toggle"
        icon={SvgMenu}
        label="Menu"
        type="action"
        active={menuOpen}
        onClick={() => {
          dispatch(Site.toggleMenuOverlay(!menuOpen));
        }}
      />
      <MenuItem
        icon={SvgDice}
        label="Games"
        type="router"
        to={{ pathname: "/", hash: "#games" }}
      />
      <MenuItem
        icon={SvgMedal}
        label="Rewards"
        type="router"
        to="/rewards"
      />
      <MenuItem
        id="chat-toggle"
        icon={SvgChat}
        label="Chat"
        type="action"
        onClick={() => {
          dispatch(Chat.toggleOverlay(!chatOpen));
        }}
      />
      <MenuItem
        icon={SvgHeadset}
        label="Support"
        type="action"
        onClick={intercom.handleToggle}
      />
    </Div>
  );
};
