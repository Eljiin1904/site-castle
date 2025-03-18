import { SvgHome } from "@client/svgs/common/SvgHome";
import { MenuItem } from "./panel/MenuItem";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgReferrals } from "@client/svgs/common/SvgReferrals";
import { MenuSeparator } from "./panel/MenuSeparator";
import { Span } from "@client/comps/span/Span";
import { MenuRace } from "./panel/MenuRace";
import { SvgDuel } from "@client/svgs/common/SvgDuel";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgOriginalGames } from "#app/svgs/common/SvgOriginalGames";
import { useState } from "react";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { To } from "react-router-dom";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { SvgDouble } from "#app/svgs/double/SvgDouble";
import { Div } from "@client/comps/div/Div";
import classNames from "classnames";
import { SvgBlock } from "@client/svgs/common/SvgBlock";
import { SvgSupport } from "#app/svgs/common/SvgSupport";
import { SvgVIP } from "#app/svgs/common/SvgVIP";
import { SvgGameShows } from "@client/svgs/common/SvgGameShows";
import { SvgLiveCasino } from "@client/svgs/common/SvgLiveCasino";
import { SvgSlots } from "@client/svgs/common/SvgSlots";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";

export const BaseMenu = ({collapsed}: {
  collapsed: boolean;
}) => {

  const [open, setOpen] = useState(false);
  const intercom = useIntercomManager();
  const {t} = useTranslation();

  return (<>
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
    icon={SvgBlock}
    label={t("menu.blog")}
    to="/blog"
    showLabel={!collapsed}
    type="nav"
  />
</>)
};

export const OriginalGames = ({animate,collapsed}: {animate?: boolean, collapsed: boolean}) => {

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