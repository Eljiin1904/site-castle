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
import { GameSlideProps, GamesSlider } from "#app/comps/games/GamesSlider";
import { OriginalGames } from "#app/comps/games/OriginalGames";
import { FeaturedGames } from "#app/comps/games/FeaturedGames";
import { GamesSection } from "#app/comps/games/GamesSection";
import { Div } from "@client/comps/div/Div";

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
            <FeaturedGames
              items={featuredGames}
              showSection={true}
            />
            <OriginalGames />
          </>
        }
        featured={
          <FeaturedGames
            items={featuredGames}
            showSection={true}
          />
        }
        original={<OriginalGames />}
        slot={<GamesSection category="slot" />}
        live_casino={<GamesSection category="live_casino" />}
        game_shows={<GamesSection category="game_shows" />}
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
      heading: t(`games:${x.name}`),
      subheading: "",
      to: `/${x.name}`,
    };
  });

  return (
    <GamesSlider
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
      heading: t(`games:${x.game}`),
      subheading: "",
      to: `/${x.game}`,
    };
  });

  return (
    <GamesSlider
      title={t("hot")}
      items={items}
      type="game"
    />
  );
};
const ProvidersSection = () => {
  const { t } = useTranslation();

  const providers: GameSlideProps[] = [
    { image: "/graphics/providers/evolution", heading: t("providers.evolution"), to: "" },
    { image: "/graphics/providers/pragmatic", heading: t("providers.pragmaticPlay"), to: "" },
    { image: "/graphics/providers/playngo", heading: t("providers.playngo"), to: "" },
    { image: "/graphics/providers/netent", heading: t("providers.netent"), to: "" },
    { image: "/graphics/providers/bigtime", heading: t("providers.bigTimeGaming"), to: "" },
    { image: "/graphics/providers/hacksaw", heading: t("providers.hackSawGaming"), to: "" },
  ];

  return (
    <GamesSlider
      type="provider"
      title={t("providers.title")}
      items={providers}
    />
  );
};
const CategoriesSection = () => {
  const { t } = useTranslation(['games']);

  const items = Game.kinds.map((x) => {
    return {
      image: `/graphics/categories/${x}`,
      heading: t(`${x}`, { count: 1 }),
      to: `/${x.replaceAll("_", "-")}`,
    };
  });
  return (
    <GamesSlider
      type="category"
      title={t("menu.categories")}
      items={items}
    />
  );
};
