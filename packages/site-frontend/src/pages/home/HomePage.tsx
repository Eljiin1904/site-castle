import { SitePage } from "#app/comps/site-page/SitePage";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { HashManager } from "./HashManager";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Conditional } from "@client/comps/conditional/Conditional";
import { HeroBanner } from "#app/app/banner/HeroBanner";
import { Game } from "@core/services/game";
import { GameSearch } from "#app/comps/games/GamesSearch";
import { SlideProps, Slider } from "#app/comps/games/Slider";
import { OriginalGames } from "#app/comps/games/OriginalGames";
import { FeaturedGames } from "#app/comps/games/FeaturedGames";
import { Div } from "@client/comps/div/Div";
import { GamesByCategory } from "../games/GamesByCategoryPage";
import { PageTitle } from "@client/comps/page/PageTitle";
import { ExternalGameCategory } from "@core/types/hub-eight/GameInformation";

const friendlyUrl = (game: string) => {
  return game.replaceAll("_", "-").toLowerCase();
};

export const HomePage = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const filterGames = useAppSelector((x) => x.site.filter) || "all";
  const games = useAppSelector((x) => x.site.games) || [];
  const small = useIsMobileLayout();
  const { t } = useTranslation();
  const featuredGames = games?.filter((x) => x.featured);

  return (
    <SitePage
      className="HomePage"
      gap={small ? 32 : 56}
    >
      <HashManager />
      <HeroBanner />

      <Div fx>
        <GameSearch home />
      </Div>
      <Conditional
        value={filterGames}
        all={
          <>
            <FeaturedGames items={featuredGames} />
            <OriginalGames />
          </>
        }
        featured={<FeaturedGames items={featuredGames} />}
        original={<OriginalGames />}
        slot={<HubEightSection category="slot" />}
        live={<HubEightSection category="live" />}
        game_shows={<HubEightSection category="game_shows" />}
      />

      <HotGamesSlider />
      <RecentlyAddedSlider />

      <ProvidersSection />
      <CategoriesSection />

      {authenticated && (
        <BetBoard
          mt={small ? 12 : 0}
          mb={small ? 20 : 32}
          title={t("bets.recentBets")}
        />
      )}
    </SitePage>
  );
};

const RecentlyAddedSlider = () => {
  const games = useAppSelector((x) => x.site.games) || [];
  const { t } = useTranslation(["games"]);

  const items = games?.map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: t(`${x.name}`),
      subheading: "",
      to: `/${friendlyUrl(x.name)}`,
    };
  });

  return (
    <Slider
      title={t("recentlyAdded")}
      items={items}
      type="game"
    />
  );
};
const HotGamesSlider = () => {
  const games = useAppSelector((x) => x.site.hotGames) || [];
  const { t } = useTranslation(["games"]);

  const items = games?.map((x) => {
    return {
      image: `/graphics/games/${x.game}`,
      heading: t(`${x.game}`),
      subheading: "",
      to: `/${friendlyUrl(x.game)}`,
    };
  });

  return (
    <Slider
      title={t("hot")}
      items={items}
      type="game"
    />
  );
};
export const ProvidersSection = () => {
  const { t } = useTranslation(["games"]);

  const providers: SlideProps[] = [
    { image: "/graphics/providers/evolution", heading: t("providers.evolution"), to: "" },
    { image: "/graphics/providers/pragmatic", heading: t("providers.pragmaticPlay"), to: "" },
    { image: "/graphics/providers/playngo", heading: t("providers.playngo"), to: "" },
    { image: "/graphics/providers/netent", heading: t("providers.netent"), to: "" },
    { image: "/graphics/providers/bigtime", heading: t("providers.bigTimeGaming"), to: "" },
    { image: "/graphics/providers/hacksaw", heading: t("providers.hackSawGaming"), to: "" },
  ];

  return (
    <Slider
      type="provider"
      title={t("providers.title", { count: 2 })}
      items={providers}
    />
  );
};
const CategoriesSection = () => {
  const { t } = useTranslation(["games"]);

  const items = Game.kinds.map((x) => {
    return {
      image: `/graphics/categories/${x}`,
      heading: t(`${x}`, { count: 2 }),
      to:
        x === "slot"
          ? "/slots"
          : x === "live"
            ? "/live-casino"
            : x === "game_shows"
              ? "/game-shows"
              : `/${x}`,
    };
  });
  return (
    <Slider
      type="category"
      title={t("menu.categories")}
      items={items}
    />
  );
};

const HubEightSection = ({ category }: { category: ExternalGameCategory }) => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["games"]);

  return (
    <Div
      fx
      justifyContent="center"
      alignItems="center"
      column
      gap={small ? 24 : 40}
    >
      <PageTitle heading={t(`${category}`)}></PageTitle>
      <GamesByCategory
        category={category}
        filterOff
      />
    </Div>
  );
};
