import { Fragment } from "react";
import { SitePage } from "#app/comps/site-page/SitePage";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { FeaturedGames } from "#app/comps/games/FeaturedGames";
import { OriginalGames } from "#app/comps/games/OriginalGames";
import { PageBanner } from "#app/comps/site-page/PageBanner";

export const OriginalGamesPage = () => {
  const games = useAppSelector((x) => x.site.games) || [];
  const small = useIsMobileLayout();
  const { t } = useTranslation();
  const featuredGames = games?.filter((x) => x.featured);

  return (
    <Fragment>
      <PageBanner
        image="/graphics/original-games-tile"
        heading={t("original", { count: 2 })}
        description=""
        content={<></>}
      />
      <SitePage
        className="GamesPage"
        gap={small ? 32 : 56}
        pb={small ? 32 : 56}
      >
        <FeaturedGames items={featuredGames} />
        <OriginalGames />
      </SitePage>
    </Fragment>
  );
};
