import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { AffiliateNewCampaignModal } from "#app/modals/affiliate/AffiliateNewCampaignModal";
import { Affiliates } from "#app/services/affiliates";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dialogs } from "@client/services/dialogs";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CampaignBody } from "./CampaignBody";
import { UserCampaigns } from "@core/types/users/UserCampaigns";

export const Campaigns = ({campaigns}: {
  campaigns: UserCampaigns[]
}) => {

  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();

  return (<Div fx column gap={small? 20: 24}>
    <PageTitle  
      heading={t('campaigns.title')}
      mt={small ? 0: 16}
    />
    {campaigns.map((campaign) => <CampaignBody key={campaign.campaignId} campaign={campaign} />)}
    <Div fx mt={20} column center>
      <Button kind="tertiary-grey" fx={small} label={t('campaigns.createCampaign')} iconLeft={SvgPlus} onClick={() => Dialogs.open("primary", <AffiliateNewCampaignModal />)} />
    </Div>
  </Div>);
};