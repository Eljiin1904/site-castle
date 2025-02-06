import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Input } from "@client/comps/input/Input";
import { ActivityFeed } from "#app/comps/activity-feed/ActivityFeed";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { HeroBanner } from "./HeroBanner";
import { GameBanner } from "./GameBanner";
import { HashManager } from "./HashManager";
import { Vector } from "@client/comps/vector/Vector";

export const HomePage = () => {
  return (
    <SitePage
      className="HomePage"
      gap={32}
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
        onChange={(x) => true}
      />
    </Div>
  );
};

const OriginalGamesSection = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = ["mobile", "tablet"].includes(layout);
  const flow = layout === "mobile" ? "row-wrap" : undefined;

  return (
    <Div
      id="home-games"
      column
      fx
      gap={16}
    >
      <PageTitle
        icon={SvgDice}
        heading="Original Games"
      />
      <Div
        gap={small ? 8 : 12}
        flow={flow}
      >
        <GameBanner
          image="/graphics/crash-tile"
          to="/crash"
          ratio="552 / 240"
        />
        <GameBanner
          image="/graphics/duel-tile"
          to="/duel"
          ratio="552 / 240"
        />
      </Div>
    </Div>
  );
};

const HotGamesSection = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = ["mobile", "tablet"].includes(layout);
  const flow = layout === "mobile" ? "row-wrap" : undefined;

  return (
    <Div
      id="home-games"
      column
      fx
      gap={16}
    >
      <PageTitle
        icon={SvgDice}
        heading="Hot Games"
      />
      <Div
        gap={small ? 8 : 12}
        flow={flow}
      >
        <GameBanner
          image="/graphics/case-battles-tile"
          heading="Battles"
          subheading="Original"
          to="/case-battles"
        />
        <GameBanner
          image="/graphics/cases-tile"
          heading="Cases"
          subheading="Original"
          to="/cases"
        />
        <GameBanner
          image="/graphics/double-tile"
          heading="Double"
          subheading="Original"
          to="/double"
        />
        <GameBanner
          image="/graphics/dice-tile"
          heading="Dice"
          subheading="Original"
          to="/dice"
        />
        <GameBanner
          image="/graphics/limbo-tile"
          heading="Limbo"
          subheading="Original"
          to="/limbo"
        />
      </Div>
    </Div>
  );
};
