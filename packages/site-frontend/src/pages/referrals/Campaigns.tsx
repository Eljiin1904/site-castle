import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { AffiliateNewCampaignModal } from "#app/modals/affiliate/AffiliateNewCampaignModal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dialogs } from "@client/services/dialogs";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const Campaigns = () => {

  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();

  return (<Div fx column gap={20}>
    <PageTitle  
      heading={t('campaigns.title')}
      mt={small ? 0: 16}
    />
    <Div fx gap={small ? 16: 24} column center>
      <Button kind="tertiary-grey" label={t('campaigns.createCampaign')} iconLeft={SvgPlus} onClick={() => Dialogs.open("primary", <AffiliateNewCampaignModal />)} />
    </Div>
  </Div>);
};