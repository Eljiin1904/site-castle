import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Slider } from "./Slider";

export const OriginalGames = () => {
  const games = useAppSelector((x) => x.site.games) || [];
  const { t } = useTranslation(["games"]);

  const items = games
    ?.filter((x) => x.category === "original")
    .map((x) => {
      return {
        image: `/graphics/games/${x.name}`,
        heading: t(`${x.name}`),
        subheading: t("original", { count: 1 }),
        to: `/${x.name}`,
      };
    });

  return (
    <Slider
      title={t("original", { count: 2 })}
      items={items}
      type="game"
    />
  );
};
