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

export const HomePage = () => {
  return (
    <SitePage
      className="HomePage"
      gap={40}
    >
      <HashManager />
      {/* <ActivityFeed /> */}
      <HeroBanner />
      <GameSearch />
      <OriginalGamesSection />
      <HotGamesSection />
      <BetBoard />
    </SitePage>
  );
};

const GameSearch = () => {
  return (
    <Div
      border
      borderColor="brown-4"
      bg="brown-6"
    >
      <Input
        iconLeft={SvgSearch}
        type="text"
        id="game-search"
        placeholder="Search for a game or provider"
        value=""
        onChange={() => true}
      />
    </Div>
  );
};

const OriginalGamesSection = () => {
  const small = useIsMobileLayout();

  return (
    <Div
      id="home-games"
      column
      fx
      gap={small ? 24 : 40}
    >
      <PageTitle
        heading="Original Games"
        mt={small ? 0 : 16}
      />
      <Div gap={small ? 20 : 24}>
        <GameBanner
          image="/graphics/crash-tile"
          to="/crash"
          ratio={small ? "150 / 160" : "552 / 240"}
          objectPositionHorizontal="80%"
        />
        <GameBanner
          image="/graphics/duel-tile"
          to="/duel"
          ratio={small ? "150 / 160" : "552 / 240"}
          objectPositionHorizontal="80%"
        />
      </Div>
    </Div>
  );
};

const HotGamesSection = () => {
  const small = useIsMobileLayout();

  return (
    <Div
      id="home-games"
      column
      fx
      gap={small ? 24 : 40}
    >
      <PageTitle
        heading="Hot Games"
        mt={small ? 0 : 16}
      />
      <Div
        gap={small ? 20 : 24}
        wrap={small}
      >
        <GameBanner
          image="/graphics/case-battles-tile"
          heading="Battles"
          subheading="Original"
          to="/case-battles"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/cases-tile"
          heading="Cases"
          subheading="Original"
          to="/cases"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/double-tile"
          heading="Double"
          subheading="Original"
          to="/double"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/dice-tile"
          heading="Dice"
          subheading="Original"
          to="/dice"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
        <GameBanner
          image="/graphics/limbo-tile"
          heading="Limbo"
          subheading="Original"
          to="/limbo"
          ratio={small ? "150 / 160" : "186 / 260"}
        />
      </Div>
    </Div>
  );
};
