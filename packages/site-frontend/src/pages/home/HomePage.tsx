import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SitePage } from "#app/comps/site-page/SitePage";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { HashManager } from "./HashManager";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Conditional } from "@client/comps/conditional/Conditional";
import { GameDocument } from "@core/types/game/GameDocument";
import { FeatureGameBanner } from "#app/app/banner/FeatureGameBanner";
import { HeroBanner } from "#app/app/banner/HeroBanner";
import { GameSlideProps, HomePageGamesSlider } from "./HomePageGamesSlider";
import { Game } from "@core/services/game";
import { HomePageSearch } from "./HomePageSearch";

export const HomePage = () => {
  
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const filterGames = useAppSelector((x) => x.site.filter) || "all";
  const games = useAppSelector((x) => x.site.games) || [];
  const small = useIsMobileLayout();

  const featuredGames = games?.filter((x) => x.featured);
  
  return (
    <SitePage
      className="HomePage"
      gap={small ? 20: 48}
    >
      <HashManager />
      <HeroBanner />

      <HomePageSearch />
      <Conditional value={filterGames}
        all={<>
          <FeaturedGamesSection items={featuredGames} showSection={true} />
          <OriginalGamesSlider />
        </>}
        featured={<FeaturedGamesSection items={featuredGames} showSection={true} />}
        original={<OriginalGamesSlider />}
        slots={<SlotGamesSlider />}
        live_casino={<LiveCasinoSlider />}
        game_shows={<GameShowsSlider />}
      />

      <HotGamesSlider />
      <RecentlyAddedSlider />
      
      <ProvidersSection />
      <CategoriesSection />
      
      {authenticated && <>        
        <BetBoard />
      </>}
    </SitePage>
  );
};


const FeaturedGamesSection = ({items, showSection}: {items: GameDocument[],showSection: boolean}) => {

  const small = useIsMobileLayout();
  const {t} = useTranslation(["games"]);

  if(!showSection) return null;

  return (<Div
      id="home-games"
      column
      fx
      gap={small ? 24 : 40}
    >
      <PageTitle
        heading={t('games.featured', {count: 2})}
        mt={small ? 0 : 16}
      />
      <Div
        gap={small ? 20 : 24}
      >
        {items.map((x) => <FeatureGameBanner key={x.name} ratio={small ? "150 / 160" : "168 / 180"} objectPositionHorizontal="80%" heading={t(`games:${x.name}`)} to={`/${x.name}`} image={`/graphics/games/${x.name}`}/>)}
      </Div>
    </Div>);
};

const OriginalGamesSlider = () => {

  const games = useAppSelector((x) => x.site.games) || [];
  const {t} = useTranslation(["games"]);

  const items = games?.filter((x) => x.category === "original").map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: t(`games:${x.name}`),
      subheading: t('games.original',{count: 1}),
      to: `/${x.name}`
    };
  });

  return (<HomePageGamesSlider title={t('games.original', {count: 2})} items={items} type="game"/>);
};
const SlotGamesSlider = () => {
  
  const games = useAppSelector((x) => x.site.games) || [];
  const {t} = useTranslation(["games"]);

  const items = games?.filter((x) => x.category === "slots").map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: t(`games:${x.name}`),
      subheading: t('games.slots'),
      to: `/${x.name}`
    };
  });

  return (<HomePageGamesSlider title={t('games.slots')} items={items} type="game"/>);
};
const LiveCasinoSlider = () => {
  
  const games = useAppSelector((x) => x.site.games) || [];
  const {t} = useTranslation(["games"]);

  const items = games?.filter((x) => x.category === "live_casino").map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: t(`games:${x.name}`),
      subheading: t('games.live_casino'),
      to: `/${x.name}`
    };
  });

  return (<HomePageGamesSlider title={t('games.live_casino')} items={items} type="game"/>);
};
const GameShowsSlider = () => {
  
  const games = useAppSelector((x) => x.site.games) || [];
  const {t} = useTranslation(["games"]);

  const items = games?.filter((x) => x.category === "game_shows").map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: t(`games:${x.name}`),
      subheading: t('games.game_shows'),
      to: `/${x.name}`
    };
  });

  return (<HomePageGamesSlider title={t('games.game_shows')} items={items} type="game"/>);
};
const RecentlyAddedSlider = () => {
  
  const games = useAppSelector((x) => x.site.games) || [];
  const {t} = useTranslation(["games"]);

  const items = games?.map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: t(`games:${x.name}`),
      subheading: '',
      to: `/${x.name}`
    };
  });

  return (<HomePageGamesSlider title={t('games.recentlyAdded')} items={items} type="game"/>);
};
const HotGamesSlider = () => {
  
  const games = useAppSelector((x) => x.site.hotGames) || [];
  const {t} = useTranslation(["games"]);

  const items = games?.map((x) => {
    return {
      image: `/graphics/games/${x.game}`,
      heading: t(`games:${x.game}`),
      subheading: '',
      to: `/${x.game}`
    };
  });

  return (<HomePageGamesSlider title={t('games.hot')} items={items} type="game"/>);
};
const ProvidersSection = () => {

  const {t} = useTranslation();

  const providers:GameSlideProps[] = [
    {image:"/graphics/providers/evolution", heading:t('providers.evolution'),to:""},
    {image:"/graphics/providers/pragmatic", heading:t('providers.pragmaticPlay'), to:""},
    {image:"/graphics/providers/playngo", heading:t('providers.playngo'), to:""},
    {image:"/graphics/providers/netent", heading:t('providers.netent'),to:""},
    {image:"/graphics/providers/bigtime", heading:t('providers.bigTimeGaming'), to:""},
    {image:"/graphics/providers/hacksaw", heading:t('providers.hackSawGaming'), to:""}
  ];

  return (<HomePageGamesSlider type="provider" title={t('providers.title')} items={providers} />);  
};
const CategoriesSection = () => {

  const {t} = useTranslation();

 const items = Game.kinds.map((x) => {
    return {
      image: `/graphics/categories/${x}`,
      heading: t(`games.${x}`,{count: 1}),
      to: `/${x}`
    };
  });
  return (<HomePageGamesSlider type="category" title={t('menu.categories')} items={items} />);
};