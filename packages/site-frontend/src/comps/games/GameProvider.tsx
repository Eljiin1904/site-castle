import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { GameSorts } from "@core/services/game/Game";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Site } from "#app/services/site";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const GameProvider = () => {

  const currentSort = useAppSelector((x) => x.site.sortBy);
  const small = useIsMobileLayout();
  const dispatch = useAppDispatch();
 
  const {t} = useTranslation();

  return (<Dropdown
    type="select"
    fx={small}
    size="lg"
    tag={t('games.provider.title')}
    options={GameSorts.map((sort) => t(`games.sort.${sort}`))}
    value={GameSorts.indexOf(currentSort ?? GameSorts[0])}
    onChange={(x, i) => dispatch(Site.setSort(GameSorts[i]))}
  />);
};