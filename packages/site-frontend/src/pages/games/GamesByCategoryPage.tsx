import { Fragment } from "react";
import { SitePage } from "#app/comps/site-page/SitePage";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { GamesSection } from "#app/comps/games/GamesSection";
import { GameSearch } from "#app/comps/games/GamesSearch";


export const GamesByCategoryPage = ({category}: {
  category: string;
}) => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation();
  
  return (<Fragment>
    <PageBanner image={`/graphics/${category}-games-tile`} heading={t(`games.${category}`)} description="" content={<></>}/> 
    <SitePage
      className="GamesPage"
      gap={small ? 32: 56}
      pb={small ? 32: 56}
    >
    <GameSearch />
    <GamesSection category={category}/>
    </SitePage>
  </Fragment>
  );
};