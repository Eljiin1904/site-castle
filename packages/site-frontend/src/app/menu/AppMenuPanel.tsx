import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Nav } from "@client/comps/nav/Nav";
import { SvgAllGames } from "@client/svgs/common/SvgAllGames";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgCrash } from "@client/svgs/common/SvgCrash";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgDuel } from "@client/svgs/common/SvgDuel";
import { SvgGameShows } from "@client/svgs/common/SvgGameShows";
import { SvgHome } from "@client/svgs/common/SvgHome";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { SvgLiveCasino } from "@client/svgs/common/SvgLiveCasino";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { SvgReferrals } from "@client/svgs/common/SvgReferrals";
import { SvgSlide } from "@client/svgs/common/SvgSlide";
import { SvgSlots } from "@client/svgs/common/SvgSlots";
import { SvgToken } from "@client/svgs/common/SvgToken";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { MenuHeader } from "./panel/MenuHeader";
import { MenuItem } from "./panel/MenuItem";
import { MenuRace } from "./panel/MenuRace";
import { MenuSeparator } from "./panel/MenuSeparator";
import "./AppMenuPanel.scss";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";

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
  const dispatch = useAppDispatch();

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
          <MenuRace collapsed={collapsed} />
          <MenuItem
            icon={SvgHome}
            label="Home"
            to="/"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgReferrals}
            label="Referrals"
            to="/referrals"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgToken}
            label="Token"
            to="/token"
            showLabel={!collapsed}
          />
          <MenuSeparator />
          <Span textTransform="uppercase" px={24} mb={24} fontWeight="medium" color="dark-sand" fontSize={10}>Games</Span>
          <MenuItem
            icon={SvgAllGames}
            label="All Games"
            to="/all-games"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgCrash}
            label="Crash Game"
            to="/crash"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgDuel}
            label="Duel Game"
            to="/duel"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgDice}
            label="Dice"
            to="/dice"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgLimbo}
            label="Limbo"
            to="/limbo"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgBlackjack}
            label="Blackjack"
            to="/blackjack"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgMines}
            label="Mines"
            to="/mines"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgChest}
            label="Cases"
            to="/cases"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgBattle}
            label="Case Battles"
            to="/case-battles"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgSlide}
            label="Double"
            to="/double"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgSlots}
            label="Slots"
            to="/slots"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgLiveCasino}
            label="Live Casino"
            to="/live-casino"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgGameShows}
            label="Game Shows"
            to="/game-shows"
            showLabel={!collapsed}
          />
        </Nav>
      </Div>
    </Div>
  );
};
