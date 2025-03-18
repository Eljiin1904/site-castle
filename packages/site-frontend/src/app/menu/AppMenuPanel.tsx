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
      bg="brown-6"
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
          <MenuItem
            icon={SvgHome}
            label={t("menu.home")}
            to="/"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuItem
            icon={SvgReferrals}
            label={t("menu.referrals")}
            to="/affiliate"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuSeparator />
          <Span textTransform="uppercase" px={24} mb={24} fontWeight="medium" color="dark-sand" fontSize={10}>{t('menu.races')}</Span>
          <MenuRace collapsed={collapsed} />
          <MenuSeparator />
          <Span textTransform="uppercase" px={24} mb={24} fontWeight="medium" color="dark-sand" fontSize={10}>{t('menu.games')}</Span>
          <MenuItem
            icon={SvgDuel}
            label={t("games.duel")}
            to="/duel"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuItem
            icon={SvgBattle}
            label={t("games.cases_battles")}
            to="/case-battles"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuItem
            icon={SvgOriginalGames}
            isSubMenu={true}
            open={open}
            label={t("games.original",{count: 2})}
            onClick={() => setOpen(!open)}
            showLabel={!collapsed}
            type="action"
          />
          <OriginalGames animate={true} collapsed={open} />
          <MenuItem
            icon={SvgSlots}
            label={t("games.slots")}
            to="/slots"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuItem
            icon={SvgLiveCasino}
            label={t("games.liveCasino")}
            to="/live-casino"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuItem
            icon={SvgGameShows}
            label={t("games.gameShows")}
            to="/game-shows"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuSeparator />
          <MenuItem
            icon={SvgVIP}
            label={t("menu.vip")}
            to="/vip"
            showLabel={!collapsed}
            type="nav"
          />
          <MenuItem
            icon={SvgSupport}
            label={t("footer.support")}
            onClick={() => intercom.handleToggle()}
            showLabel={!collapsed}
            type="action"
          />
          <MenuItem
            icon={SvgBlog}
            label={t("menu.blog")}
            to="/blog"
            showLabel={!collapsed}
            type="nav"
          />
        </Nav>
      </Div>
    </Div>
  );
};


const OriginalGames = ({animate,collapsed}: {animate?: boolean, collapsed: boolean}) => {

  const {t} = useTranslation();

  const games: {icon: Svg, label: string, to: To}[] = [{icon: SvgDice, label:t('games.dice'), to: "/originals/dice"},
    {icon: SvgLimbo, label: t('games.limbo'), to: "/originals/limbo"},
    {icon: SvgBlackjack, label: t('games.blackjack'), to: "/originals/blackjack"},
    {icon: SvgMines, label: t('games.mines'), to: "/originals/mines"},
    {icon: SvgDouble, label: t('games.double'), to: "/originals/double"}];

  return (<Div 
    className={classNames("OriginalGames", {
      animate,
      opened: !collapsed,
      closed: collapsed,
    })}
    column
  fx>
    {games.map((game, i) => (
      <MenuItem
        key={i}
        icon={game.icon}
        label={game.label}
        type="nav"
        to={game.to}
        showLabel={!collapsed}
      />
    ))}
  </Div>);
};