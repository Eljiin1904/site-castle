import { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { Div } from "@client/comps/div/Div";
import { Nav } from "@client/comps/nav/Nav";
import { Dialogs } from "@client/services/dialogs";
import { SvgMedal } from "@client/svgs/common/SvgMedal";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgSlide } from "@client/svgs/common/SvgSlide";
import { SvgDeposit } from "@client/svgs/common/SvgDeposit";
import { SvgHistory } from "@client/svgs/common/SvgHistory";
import { SvgSignOut } from "@client/svgs/common/SvgSignOut";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgMultiplier } from "@client/svgs/common/SvgMultiplier";
import { SvgWithdraw } from "@client/svgs/common/SvgWithdraw";
import { SvgTransaction } from "@client/svgs/common/SvgTransaction";
import { SvgVault } from "@client/svgs/common/SvgVault";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserLogoutModal } from "#app/modals/user/UserLogoutModal";
import { WalletModal } from "#app/modals/wallet/WalletModal";
import { VaultModal } from "#app/modals/vault/VaultModal";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";
import { NavItem } from "./overlay/NavItem";
import { NavSection } from "./overlay/NavSection";
import { MenuRace } from "./overlay/MenuRace";
import { MenuEvent } from "./overlay/MenuEvent";
import "./AppMenuOverlay.scss";
import { GameSearch } from "#app/pages/home/HomePage";
import { MenuItem } from "./panel/MenuItem";
import { SvgHome } from "@client/svgs/common/SvgHome";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgReferrals } from "@client/svgs/common/SvgReferrals";
import { MenuSeparator } from "./panel/MenuSeparator";
import { Span } from "@client/comps/span/Span";
import { BaseMenu } from "./BaseMenu";

export const AppMenuOverlay = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const open = useAppSelector((x) => x.site.menuOverlayOpen);

  if (["laptop", "desktop"].includes(layout)) {
    return null;
  }

  if (!open) {
    return null;
  }

  return <OverlayContent />;
};

const OverlayContent = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const dispatch = useAppDispatch();
  const innerRef = useRef<HTMLDivElement>(null);
  const [filterGames, setFilterGames] = useState("");
  const {t} = useTranslation();

  const handleClose = () => {
    dispatch(Site.toggleMenuOverlay(false));
  };

  useEventListener("mousedown", (e) => {
    const target = e.target as Element;

    if (innerRef.current?.contains(target)) {
      return;
    }

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const isToggle = elements.some((x) => x.id === "menu-toggle");

    if (!isToggle) {
      handleClose();
    }
  });

  return (
    <Div
      className="AppMenuOverlay"
      position="absolute"
      fx
    >
      <Nav
        className="inner-content"
        forwardRef={innerRef}
        flow="column"
        fx
        fy
        gap={20}
        py={20}
        overflow="auto"
        bg="black-hover"
      >
        {/* <GameSearch filterGames={filterGames} setFilterGames={setFilterGames} /> */}
        <BaseMenu collapsed={false} />
      </Nav>
    </Div>
  );
};
