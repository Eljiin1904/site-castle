import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { GameSorts } from "@core/services/game/Game";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Site } from "#app/services/site";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const GameSort = () => {

  const currentSort = useAppSelector((x) => x.site.sortBy);
  const small = useIsMobileLayout();
  const dispatch = useAppDispatch();
  const {t} = useTranslation(['games']);

  return (<Dropdown
    type="select"
    size="lg"
    fx={small}
    tag={t('sort.title')}
    options={GameSorts.map((sort) => t(`sort.${sort}`))}
    value={GameSorts.indexOf(currentSort ?? GameSorts[0])}
    onChange={(x, i) => dispatch(Site.setSort(GameSorts[i]))}
  />);
};