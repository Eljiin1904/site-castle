import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Slider } from "./Slider";

export const GamesSection = ({ category }: { category: string }) => {
  const games = useAppSelector((x) => x.site.games) || [];
  const { t } = useTranslation(["games"]);

  const header = t(`${category}`);

  const items = games
    ?.filter((x) => x.category === category)
    .map((x) => {
      return {
        image: `/graphics/games/${x.name}`,
        heading: t(`${x.name}`),
        subheading: header,
        to: `/${x.name}`,
      };
    });

  return (
    <Slider
      title={header}
      items={items}
      type="game"
    />
  );
};
