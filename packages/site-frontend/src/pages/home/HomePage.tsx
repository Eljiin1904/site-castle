import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Input } from "@client/comps/input/Input";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { HeroBanner } from "./HeroBanner";
import { GameBanner } from "./GameBanner";
import { HashManager } from "./HashManager";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { HeroBannerSlide } from "./HeroBannerSlide";
import { FeatureGameBanner } from "./FeatureGameBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const HomePage = () => {
  
  const authenticated = useAppSelector((x) => x.user.authenticated);
  return (
    <SitePage
      className="HomePage"
      gap={40}
    >
      <HashManager />
      {/* <ActivityFeed /> */}
      <HeroBanner />
      {authenticated && <GameSearch />}
      <OriginalGamesSection />
      {authenticated && <>
        <HotGamesSection />
        <BetBoard />
      </>}
    </SitePage>
  );
};

const GameSearch = () => {
  const small = useIsMobileLayout();
  const {t} = useTranslation();
  return (
    <Div
      fx
      column
      gap={24}
      flexGrow
    >
      <Input
        iconLeft={SvgSearch}
        size="lg"
        type="text"
        id="game-search"
        placeholder="Search for a game or provider"
        value=""
        onChange={(x) => true}
        mt={8}
      />
      <ButtonGroup
          options={[t('games.all'),t('games.slots'),t('games.liveCasino'),t('games.gameShows'),t('games.originals')]}
          size={small ? "sm" : "md"}
          gap={small ? 12 : 16}
          value={["all", "slots", "casino", "show","original"].indexOf("all")}  
          setValue={(x) => console.log(x)}
      />
    </Div>
  );
};

const OriginalGamesSection = () => {

  const small = useIsMobileLayout();
  const {t} = useTranslation();
  return (
    <Div
      id="home-games"
      column
      fx
      gap={small ? 24 : 40}
    >
      <PageTitle
        heading={t('games.originals')}
        mt={small ? 0 : 16}
      />
      <Div
        gap={small ? 20 : 24}
      >
        <FeatureGameBanner ratio={small ? "150 / 160" : "552 / 240"}  objectPositionHorizontal="80%"  image="/graphics/games/crash-tile" to="/crash" heading={t('games.crash')}/>
        <FeatureGameBanner ratio={small ? "150 / 160" : "552 / 240"}  objectPositionHorizontal="80%" image="/graphics/games/duel-tile" to="/duel" heading={t('games.duel')}/>
      </Div>
    </Div>
  );
};

const HotGamesSection = () => {
  const small = useIsMobileLayout();
  const {t} = useTranslation();
  return (
    <Div
      id="home-games"
      column
      fx
      gap={small ? 24 : 40}
    >
      <PageTitle
        heading={t('games.hot')}
        mt={small ? 0 : 16}
      />
      <Div
       gap={small ? 20 : 24}
       wrap={small}
      >
        <GameBanner
          image="/graphics/case-battles-tile"
          heading={t('games.casesBattles')}
          subheading="Original"
          to="/case-battles"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/cases-tile"
          heading={t('games.cases')}
          subheading="Original"
          to="/cases"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/double-tile"
          heading={t('games.double')}
          subheading="Original"
          to="/double"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/dice-tile"
          heading={t('games.dice')}
          subheading="Original"
          to="/dice"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/limbo-tile"
          heading={t('games.limbo')}
          subheading="Original"
          to="/limbo"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
      </Div>
    </Div>
  );
};
