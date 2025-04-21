import { Div } from "@client/comps/div/Div";
import { SvgMenu } from "@client/svgs/common/SvgMenu";
import { SvgChat } from "@client/svgs/common/SvgChat";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Chat } from "#app/services/chat";
import { Site } from "#app/services/site";
import { MenuItem } from "./bar/MenuItem";
import "./AppMenuBar.scss";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgCasino } from "#app/svgs/common/SvgCasino";
import { useTranslation } from "@core/services/internationalization/internationalization";

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
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  return (
    <Div
      className="AppMenuBar"
      fx
      borderTop
      borderColor="brown-4"
      py={16}
      bg="black-hover"
    >
      <MenuItem
        id="menu-toggle"
        icon={SvgMenu}
        label={t("menu.menu")}
        type="action"
        active={menuOpen}
        onClick={() => {
          dispatch(Site.toggleMenuOverlay(!menuOpen));
        }}
      />
      <MenuItem
        icon={SvgCasino}
        label={t("menu.casino")}
        type="nav"
        to="/casino"
      />
      <MenuItem
        icon={SvgBets}
        label={t("menu.bet",{count: 2})}
        type="nav"
        to="/bets"
      />
      <MenuItem
        id="chat-toggle"
        icon={SvgChat}
        label={t("menu.chat")}
        type="action"
        onClick={() => {
          dispatch(Chat.toggleOverlay(!chatOpen));
        }}
      />
    </Div>
  );
};
