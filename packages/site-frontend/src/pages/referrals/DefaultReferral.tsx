import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Dialogs } from "@client/services/dialogs";
import { AffiliateReferAFriendModal } from "#app/modals/affiliate/AffiliateReferAFriendModal";
import config from "#app/config";
import { UserCampaigns } from "@core/types/users/UserCampaigns";

/**
 * Display the default campaign code and link for the user. Copy link to clipboard functionality is included.
 * @returns Default Campaign Details component
 */
export const DefaultReferral = ({campaign}: {
  campaign?: UserCampaigns
}) => {

  const username = useAppSelector((x) => x.user.username);
  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();

  if(!campaign) return null;

  return (<Div fx column gap={20}>
    <PageTitle  
      heading={t('inviteAFriend')}
      mt={small ? 0: 16}
    />
    <Div fx bg={`black-hover`} gap={small ? 16: 24} p={small ? 20: 24} column={small}>
      <ModalSection>
        <ModalLabel>{t('referralCode')}</ModalLabel>
        <ModalField>{campaign.campaignId}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{t('referralLink')}</ModalLabel>
        <ModalField justifyContent="space-between" onClick={() => Dialogs.open('primary',<AffiliateReferAFriendModal commissionRate={campaign.commissionRate*100} campaignId={campaign.campaignId} />)}>{`${config.siteURL}/r/${campaign.campaignId}`}<Vector as={SvgCopy} /></ModalField>
      </ModalSection>
    </Div>
  </Div>);
};