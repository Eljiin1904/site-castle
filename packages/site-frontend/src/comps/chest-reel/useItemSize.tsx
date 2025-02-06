import { ChestLayout } from "@core/types/chests/ChestLayout";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

const itemSizes = {
  vertical: { mobile: 90, tablet: 140, laptop: 150, desktop: 150 },
  horizontal: { mobile: 180, tablet: 200, laptop: 220, desktop: 220 },
};

export function useItemSize(layout: ChestLayout) {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return itemSizes[layout][mainLayout];
}
