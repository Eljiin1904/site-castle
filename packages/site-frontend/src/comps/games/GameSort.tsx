import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { GameSorts } from "@core/services/game/Game";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const GameSort = ({
  sortBy,
  setSortBy
}: {
  sortBy: string | undefined;
  setSortBy: (sort: string) => void;
}) => {

  const small = useIsMobileLayout();
  const {t} = useTranslation(['games']);

  return (<Dropdown
    type="select"
    size="lg"
    fx={small}
    tag={t('sort.title')}
    options={GameSorts.map((sort) => t(`sort.${sort}`))}
    value={GameSorts.indexOf(sortBy ?? GameSorts[0])}
    onChange={(x, i) => setSortBy(GameSorts[i])}
  />);
};