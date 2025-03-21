import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { PageTitle } from "@client/comps/page/PageTitle";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const BetNav = ({heading, scope, setScope}: {
  heading: string;
  scope: SiteBetScope;
  setScope: (x: SiteBetScope) => void;
}) => {

  const authenticated = useAppSelector((x) => x.user.authenticated);
  const small = useIsMobileLayout();
  const {t} = useTranslation();
  let options = [t('bets.allBets'),t('bets.highRollers'),t('bets.luckyBets'),t('menu.races')];
  let values = [ "all", "highroller", "lucky","races"];
  if (authenticated) {
    options = [t('bets.myBets'), ...options];
    values = ["user", ...values];
  } 
  
  return (<Div
    column
    fx
    gap={24}
  >
    <PageTitle
      heading={heading}
      mb={small ? 0 : 16}
    />
    <ButtonGroup
      options={options}
      size={small ? "sm" : "md"}
      labelSize={12}
      gap={small ? 12 : 16}
      value={values.indexOf(scope)}  
      setValue={(x) => values[x] && setScope(values[x] as SiteBetScope)}
    />
  </Div>);
};
