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
import { FeatureGameBanner } from "./FeatureGameBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Button } from "@client/comps/button/Button";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { SvgSliderArrow } from "@client/svgs/common/SvgSliderArrow";
import { SvgSliderArrowNext } from "@client/svgs/common/SvgSliderArrowNext";
import { ProviderBanner } from "./ProviderBanner";
import { CategoryBanner } from "./CategoryBanner";

export const HomePage = () => {
  
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const [filterGames, setFilterGames] = useState("all");
  return (
    <SitePage
      className="HomePage"
      gap={40}
    >
      <HashManager />
      <HeroBanner />
      <GameSearch setFilterGames = {setFilterGames} filterGames={filterGames} />

      <FeaturedGamesSection showSection={filterGames === 'all' || filterGames == 'featured'} />
      <OriginalGamesSection showSection={filterGames === 'all' || filterGames == 'original'}  />
      <HotGamesSection  showSection={filterGames === 'all'} />
      <RecentlyAdedGamesSection  showSection={filterGames === 'all'} />
      <ProvidersSection />
      <CategoriesSection />
      
      {authenticated && <>
        
        <BetBoard />
      </>}
    </SitePage>
  );
};

const GameSearch = ({
  setFilterGames,
  filterGames
}: {
  setFilterGames: (x: string) => void,
  filterGames: string
}) => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation(["home"]);

  const gameOptions = [t('games.all'),t('games.featured',{count: 2}),t('games.original',{count: 2}),t('games.slots'),t('games.liveCasino'),t('games.gameShows')];
  const gameValues = ["all", "featured", "original", "slots","live","show"];
  const value = gameValues.indexOf(filterGames);
  
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
        placeholder={t('search')}
        value=""
        onChange={(x) => true}
        mt={8}
      />
      <ButtonGroup
          options={gameOptions}
          size={small ? "sm" : "md"}
          gap={small ? 12 : 16}
          value={value}  
          setValue={(x) => setFilterGames(gameValues[x])}
      />
    </Div>
  );
};
const FeaturedGamesSection = ({showSection}: {showSection: boolean}) => {

  const small = useIsMobileLayout();
  const {t} = useTranslation();

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
        <FeatureGameBanner ratio={small ? "150 / 160" : "552 / 240"}  objectPositionHorizontal="80%"  image="/graphics/games/crash-tile" to="/crash" heading={t('games.duel')}/>
        <FeatureGameBanner ratio={small ? "150 / 160" : "552 / 240"}  objectPositionHorizontal="80%" image="/graphics/games/duel-tile" to="/duel" heading={t('games.casesBattles')}/>
      </Div>
    </Div>);
};

const OriginalGamesSection = ({showSection}: {showSection: boolean}) => {

  const {t} = useTranslation();

  const games = [
    {image:"/graphics/original-game-default", heading:t('games.dice'),subheading:t('games.original',{count: 1}), to:"/dice"},
    {image:"/graphics/original-game-default", heading:t('games.limbo'),subheading:t('games.original',{count: 1}), to:"/limbo"},
    {image:"/graphics/original-game-default", heading:t('games.blackjack'),subheading:t('games.original',{count: 1}), to:"/blackjack"},
    {image:"/graphics/original-game-default", heading:t('games.mines'),subheading:t('games.original',{count: 1}), to:"/mines"},
    {image:"/graphics/original-game-default", heading:t('games.double'),subheading:t('games.original',{count: 1}), to:"/double"},
    {image:"/graphics/original-game-default", heading:t('games.crash'),subheading:t('games.original',{count: 1}), to:"/crash"}
  ];

  if(!showSection) return null;
  return (<GameSection title={t('games.original',{count: 2})} items={games} />);
};
const HotGamesSection = ({showSection}: {showSection: boolean}) => {

  const {t} = useTranslation();

  const games = [
    {image:"/graphics/case-battles-tile", heading:t('games.casesBattles'),subheading:"Original", to:"/case-battles"},
    {image:"/graphics/cases-tile", heading:t('games.cases'),subheading:"Original", to:"/cases"},
    {image:"/graphics/double-tile", heading:t('games.double'),subheading:"Original", to:"/double"},
    {image:"/graphics/dice-tile", heading:t('games.dice'),subheading:"Original", to:"/dice"},
    {image:"/graphics/limbo-tile", heading:t('games.limbo'),subheading:"Original", to:"/limbo"}
  ];
  if(!showSection) return null;
  return (<GameSection title={t('games.hot')} items={games} />);
};
const RecentlyAdedGamesSection = ({showSection}: {showSection: boolean}) => {

  const {t} = useTranslation();

  const games = [
    {image:"/graphics/case-battles-tile", heading:t('games.casesBattles'),subheading:"Original", to:"/case-battles"},
    {image:"/graphics/cases-tile", heading:t('games.cases'),subheading:"Original", to:"/cases"},
    {image:"/graphics/double-tile", heading:t('games.double'),subheading:"Original", to:"/double"},
    {image:"/graphics/dice-tile", heading:t('games.dice'),subheading:"Original", to:"/dice"},
    {image:"/graphics/limbo-tile", heading:t('games.limbo'),subheading:"Original", to:"/limbo"}
  ];
  
  if(!showSection) return null;
  return (<GameSection title={t('games.recentlyAdded')} items={games} />);
};
const ProvidersSection = () => {

  const {t} = useTranslation();

  const providers = [
    {image:"/graphics/providers/evolution", heading:t('providers.evolution'),subheading:"", to:""},
    {image:"/graphics/providers/pragmatic", heading:t('providers.pragmaticPlay'),subheading:"", to:""},
    {image:"/graphics/providers/playngo", heading:t('providers.playngo'),subheading:"", to:""},
    {image:"/graphics/providers/netent", heading:t('providers.netent'),subheading:"", to:""},
    {image:"/graphics/providers/bigtime", heading:t('providers.bigTimeGaming'),subheading:"", to:""},
    {image:"/graphics/providers/hacksaw", heading:t('providers.hackSawGaming'),subheading:"", to:""}
  ];

  return (<GameSection title={t('providers.title')} items={providers} />);  
};

const CategoriesSection = () => {

  const small = useIsMobileLayout();
  const {t} = useTranslation();

  return (<Div
    id="home-games"
    column
    fx
    gap={small ? 24 : 40}
  >
    <PageTitle
      heading={t('menu.categories')}
      mt={small ? 0 : 16}
    />
    <Div
      gap={small ? 20 : 24}
    >
      <CategoryBanner ratio={small ? "150 / 160" : "206 / 88"}  objectPositionHorizontal="80%"  image="/graphics/categories/featured" to="/featured" heading={t('games.featured', {count: 1})}/>
      <CategoryBanner ratio={small ? "150 / 160" : "206 / 88"}  objectPositionHorizontal="80%" image="/graphics/categories/originals" to="/original" heading={t('games.original',{count: 2})}/>
      <CategoryBanner ratio={small ? "150 / 160" : "206 / 88"}  objectPositionHorizontal="80%" image="/graphics/categories/slots" to="/slots" heading={t('games.slots')}/>
      <CategoryBanner ratio={small ? "150 / 160" : "206 / 88"}  objectPositionHorizontal="80%" image="/graphics/categories/live-casino" to="/live-casino" heading={t('games.liveCasino')}/>
      <CategoryBanner ratio={small ? "150 / 160" : "206 / 88"}  objectPositionHorizontal="80%" image="/graphics/categories/game-shows" to="/game-shows" heading={t('games.gameShows')}/>
    </Div>
  </Div>);
};


type ItemGameSectionProps = {
  image: string,
  heading: string,
  subheading?: string,
  to: string
};

const GameSection = ({title, items }: {
  title: string,
  items : ItemGameSectionProps[]
}) => {

  const [index, setIndex] = useState(0);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const gap = layout === "mobile" ? 20 : 24;
  
  let slideElementsInDisplay = 6;
  switch(layout){
    case "mobile":
      slideElementsInDisplay = 2;
      break;
    case "tablet":
      slideElementsInDisplay = 4;
      break;
    case "laptop":
      slideElementsInDisplay = 5;
      break;
  }

  const handlePrevious = () => {
    setIndex((i) => (i - 1 < 0 ? items.length - 1 : i - 1));
  };

  const handleNext = () => {
    setIndex((i) => (i + 1 === items.length ? 0 : i + 1));
  };
  
  const swipe = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  return (<Div fx column  gap={layout === 'mobile' ? 24 : 40}
    mb={0}>
    <Div className="gameSectionHeader"
      fx alignItems="center" mt={layout === 'mobile' ? 0 : 16}>
      <PageTitle
        heading={title}
      />
      <Div className="gameSectionControls" gap={16}>
        <Button kind="tertiary-grey" size="md" icon={SvgSliderArrow} disabled={index === 0 } onClick={handlePrevious} />
        <Button kind="tertiary-grey" size="md" onClick={handleNext} disabled={index === items.length - slideElementsInDisplay} icon={SvgSliderArrowNext} />
      </Div>
    </Div>
    <Div
     overflow="hidden"
     onMouseDown={swipe.onMouseDown}
    >
      <Div
        style={{
          transition: `left ${layout === 'mobile'? "0.5s" : "1s"} ease-in-out`,
          width: `100%`,
          left: `calc(-1*(100% - ${(slideElementsInDisplay-1)*gap}px)*${index}/${slideElementsInDisplay} - ${index}*${gap}px)`
        }}
        gap={layout === 'mobile' ? 20 : 24}
      >
        {items.map((x, i) => (
          (x.to ? <GameBanner
            key={`${title} ${x.heading}`}
            ratio={layout === 'mobile' ? "150 / 160" : "168 / 180"}
            {...x}
          /> : <ProviderBanner image={x.image} key={`${title} ${x.heading}`} />)
        ))}
      </Div>
    </Div>
  </Div>);
};