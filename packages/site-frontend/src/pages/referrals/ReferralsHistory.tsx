import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ReferralsHistory = () => {

  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();

  return (<Div fx column gap={20}>
    <PageTitle  
      heading={t('history.title')}
      mt={small ? 0: 16}
    />
    <Div fx gap={small ? 16: 24} column center>
      
    </Div>
  </Div>);
};