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
import { MenuItem, MenuItemAction } from "./panel/MenuItem";
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
          />
          <MenuItem
            icon={SvgReferrals}
            label={t("menu.referrals")}
            to="/affiliate"
            showLabel={!collapsed}
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
          />
          <MenuItem
            icon={SvgBattle}
            label={t("games.casesBattles")}
            to="/case-battles"
            showLabel={!collapsed}
          />
           <MenuItem
            icon={SvgOriginalGames}
            label={t("games.original",{count: 2})}
            to="/original"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgSlots}
            label={t("games.slots")}
            to="/slots"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgLiveCasino}
            label={t("games.liveCasino")}
            to="/live-casino"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgGameShows}
            label={t("games.gameShows")}
            to="/game-shows"
            showLabel={!collapsed}
          />
          <MenuSeparator />
          <MenuItem
            icon={SvgVIP}
            label={t("menu.vip")}
            to="/vip"
            showLabel={!collapsed}
          />
          <MenuItemAction
            icon={SvgSupport}
            label={t("footer.support")}
            onClick={() => intercom.handleToggle()}
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgBlog}
            label={t("menu.blog")}
            to="/blog"
            showLabel={!collapsed}
          />
        </Nav>
      </Div>
    </Div>
  );
};

{/* <MenuItem
            icon={SvgDice}
            label={t("games.dice")}
            to="/dice"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgLimbo}
            label={t("games.limbo")}
            to="/limbo"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgBlackjack}
            label={t("games.blackjack")}
            to="/blackjack"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgMines}
            label={t("games.mines")}
            to="/mines"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgChest}
            label={t("games.cases")}
            to="/cases"
            showLabel={!collapsed}
          />
          <MenuItem
            icon={SvgSlide}
            label={t("games.double")}
            to="/double"
            showLabel={!collapsed}
          /> */}
