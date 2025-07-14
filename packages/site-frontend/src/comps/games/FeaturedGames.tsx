import { FeatureGameBanner } from "#app/app/banner/FeatureGameBanner";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { GameDocument } from "@core/types/game/GameDocument";

export const FeaturedGames = ({ items }: { items: GameDocument[] }) => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["games"]);

  return (
    <Div
      id="home-games"
      column
      fx
      gap={small ? 24 : 40}
    >
      <PageTitle heading={t("featured", { count: 2 })} />
      <Div gap={small ? 20 : 24}>
        {items.map((x) => (
          <FeatureGameBanner
            key={x.name}
            ratio={small ? "150 / 160" : "552 / 240"}
            objectPositionHorizontal="80%"
            heading={t(`games:${x.name}`)}
            to={`/${x.name}`}
            image={`/graphics/games/${x.name}`}
          />
        ))}
      </Div>
    </Div>
  );
};
