import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Site } from "#app/services/site";
import { Input } from "@client/comps/input/Input";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const SiteSearch = () => {
  
  const currentSearch = useAppSelector((x) => x.site.search);
  const dispatch = useAppDispatch();
  const {t} = useTranslation(["home"]);

  return (<Input
    iconLeft={SvgSearch}
    size="lg"
    type="text"
    id="game-search"
    placeholder={t('search')}
    value={currentSearch}
    onChange={(search) => dispatch(Site.setSearch(search))}
  />);
};