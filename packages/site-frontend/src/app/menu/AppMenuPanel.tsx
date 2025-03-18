import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Nav } from "@client/comps/nav/Nav";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgDuel } from "@client/svgs/common/SvgDuel";
import { SvgGameShows } from "@client/svgs/common/SvgGameShows";
import { SvgHome } from "@client/svgs/common/SvgHome";
import { SvgLiveCasino } from "@client/svgs/common/SvgLiveCasino";
import { SvgReferrals } from "@client/svgs/common/SvgReferrals";
import { SvgSlots } from "@client/svgs/common/SvgSlots";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { MenuHeader } from "./panel/MenuHeader";
import { MenuItem } from "./panel/MenuItem";
import { MenuRace } from "./panel/MenuRace";
import { MenuSeparator } from "./panel/MenuSeparator";
import "./AppMenuPanel.scss";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgVIP } from "#app/svgs/common/SvgVIP";
import { SvgSupport } from "#app/svgs/common/SvgSupport";
import { SvgBlog } from "#app/svgs/common/SvgBlog";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import { SvgOriginalGames } from "#app/svgs/common/SvgOriginalGames";
import { useState } from "react";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { To } from "react-router-dom";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { SvgDouble } from "#app/svgs/double/SvgDouble";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { BaseMenu } from "./BaseMenu";

export const AppMenuPanel = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  if (["mobile", "tablet"].includes(layout)) {
    return null;
  }

  return <PanelContent />;
};

const PanelContent = () => {
  const collapsed = useAppSelector((x) => x.site.menuPanelCollapsed);
  const animate = useAppSelector((x) => x.site.menuPanelCollapsedChanged);
  const [open, setOpen] = useState(false);
  const intercom = useIntercomManager();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  return (
    // TODO: make background color configurable
    <Div
      className={classNames("AppMenuPanel", {
        animate,
        opened: !collapsed,
        closed: collapsed,
      })}
      column
      fy
      bg="black-hover"
    >
      <MenuHeader
        collapsed={collapsed}
        handleToggle={() => dispatch(Site.collapseMenuPanel(!collapsed))}
      />
      <Div
        borderRight
        borderColor="brown-4"
      >
        <Nav
          className="menu-list"
          column
          justify="flex-start"
          fx
        >
          <BaseMenu collapsed={collapsed} />
        </Nav>
      </Div>
    </Div>
  );
};