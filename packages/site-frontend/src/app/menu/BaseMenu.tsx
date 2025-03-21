import React from 'react';
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
import { Div } from "@client/comps/div/Div";
import classNames from "classnames";
import { SvgBlock } from "@client/svgs/common/SvgBlock";
import { SvgSupport } from "#app/svgs/common/SvgSupport";
import { SvgVIP } from "#app/svgs/common/SvgVIP";
import { SvgGameShows } from "@client/svgs/common/SvgGameShows";
import { SvgLiveCasino } from "@client/svgs/common/SvgLiveCasino";
import { SvgSlots } from "@client/svgs/common/SvgSlots";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import { useIsMobileLayout } from '#app/hooks/style/useIsMobileLayout';
import { useAppSelector } from '#app/hooks/store/useAppSelector';
import { Games } from '#app/services/games';

export const BaseMenu = ({collapsed}: {
  collapsed: boolean;
}) => {

  const intercom = useIntercomManager();
  const {t} = useTranslation();

  return (<>
  <MenuItem
    icon={SvgHome}
    label={t("menu.home")}
    to="/"
    end={true}
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
    label={t("games.case_battles")}
    to="/case-battles"
    end
    showLabel={!collapsed}
    type="nav"
  />
  <OriginalGames collapsed={!collapsed} />    
  <MenuItem
      icon={SvgSlots}
      label={t("games.slots")}
      to="/slots"
      showLabel={!collapsed}
      type="nav"
    />
  <MenuItem
    icon={SvgLiveCasino}
    label={t("games.live_casino")}
    to="/live-casino"
    showLabel={!collapsed}
    type="nav"
  />
  <MenuItem
    icon={SvgGameShows}
    label={t("games.game_shows")}
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

export const OriginalGames = ({collapsed} : {collapsed: boolean}) => {

  const [animate, setAnimate] = useState(false);
  const [open, setOpen] = useState(false);
  const games = useAppSelector((x) => x.site.games) || [];
  const small = useIsMobileLayout();
  const {t} = useTranslation();

  const originalGames = games?.filter((x) => x.category === "original").map((x) => {
    return {
      icon: Games.getGameIcon(x),
      label: t(`games.${x.name}`),
      to: `/${x.name}`
    }
  });

  const onClickMenu = () => {
    setAnimate(true);
    setOpen(!open)
  }
  
  return (<Div 
     px={12}
     column
     fx
    >
     <MenuItem
      icon={SvgOriginalGames}
      isSubMenu={true}
      open={open}
      label={t("games.original",{count: 2})}
      onClick={onClickMenu}
      showLabel={collapsed}
      type="action"
      bg={ open ? "dark-brown": "black-hover"}
    />
    <Div
      className={classNames("OriginalGames", {
        animate: animate,
        opened: open,
        closed: !open,
      })}
      column
      bg={ "dark-brown"}
    fx>
      {originalGames.map((game, i) => (
        <MenuItem
          key={i}
          icon={game.icon}
          label={game.label}
          type="nav"
          to={game.to}
          showLabel={collapsed}
        />
      ))}
    </Div>
  </Div>);
};