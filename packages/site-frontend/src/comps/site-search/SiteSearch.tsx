import React,{ useEffect, useState } from "react";
import { GameBanner } from "#app/app/banner/GameBanner";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Site } from "#app/services/site";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Span } from "@client/comps/span/Span";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import './SiteSearch.scss'
import { useQuery } from "@tanstack/react-query";
import { HubEight } from "#app/services/hubEight";
import { GamesGrid } from "#app/pages/games/GamesGrid";

interface EventTarget  {
  blur: () => void;
}

export const SiteSearch = () => {
  
  const currentSearch = useAppSelector((x) => x.site.search);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["home"]);

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if(e.key === 'Escape') {
        setOpen(false);
        (e.target as unknown as EventTarget).blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown',handleKeyDown);
    
  },[]);

  return (<Div fx zIndex={13} position="static">
      {open && <Div className="SearchOverlay" fx fy position="fixed" top={0} left={0} onClick={() => setOpen(false)}/>}
      <Input
      iconLeft={SvgSearch}
      iconRight={SvgTimes}
      size="lg"
      type="text"
      id="game-search"
      placeholder={t('search')}
      value={currentSearch}
      onFocus={() => setOpen(true)}
      onChange={(search) => dispatch(Site.setSearch(search))}
      onIconRightClick={() => dispatch(Site.setSearch(''))}
    />
    
    {open && <SearchResultBox />}
  </Div>);
};

const SearchResultBox = () => {

  const small = useIsMobileLayout();
  const currentSearch = useAppSelector((x) => x.site.search);
  const searchLength = currentSearch?.length || 0;

  return (<Div fx className="SearchResult" position="absolute" left={0} top={56} bg="black-hover" px={small ? 20: 24} py={small? 16: 32} zIndex={15}>
      {searchLength < 3 ? <MinCharacters /> : <SearchResults />}
  </Div>)
};

const MinCharacters = () => {
  
  const {t} = useTranslation(["home"]);
  return <Span>{t('searchMinChars')}</Span>;
}

const SearchResults = () => {

  const {t,i18n} = useTranslation(["home"]);
  const currentSearch = useAppSelector((x) => x.site.search);
  const games = useAppSelector((x) => x.site.games) || [];
  const layout = useAppSelector((x) => x.style.mainLayout);
 
  const query = useQuery({
    queryKey: ["games-results", currentSearch],
    queryFn: () => HubEight.getGameList({searchText: currentSearch,limit: 100}),
    placeholderData: (prev) => prev,
  });

  const translated: any = i18n.store.data[i18n.language].games;
  const gameKeys = Object.keys(translated).filter((key) => typeof translated[key] === 'string' && translated[key].length > 0);
  const searchLength = currentSearch?.length || 0;
  if(searchLength < 3 || gameKeys.length == 0) return null;  
  const gamesKeys = gameKeys.filter((key) => {

    return translated[key].toLocaleLowerCase().includes(currentSearch?.toLocaleLowerCase());
  });

  const result = games.filter((x) => gamesKeys.includes(x.name));
  const data = query.data?.games || [];

  if(result.length === 0 && data.length === 0) return <Span>{t('searchNotFound')}</Span>;
  
  const items = result?.map((x) => {
    return {
      image: `/graphics/games/${x.name}`,
      heading: translated[x.name],
      subheading: '',
      to: `/games/${x.name}`
    };
  });

  return (<Div
      className="SearchResults"
      gap={layout === 'mobile' ? 20 : 24}
      fx
    >
      {items.map((x, i) => <GameBanner key={`${x.heading}-${i}`} ratio={layout === 'mobile' ? "150 / 160" : "168 / 180"} {...x}/>)}
      {data.length > 0 && <GamesGrid games={data} />}
    </Div>);
};