import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { UserCampaigns } from "@core/types/users/UserCampaigns"
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Heading } from "@client/comps/heading/Heading";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useState } from "react";
import classNames from "classnames";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { WidgetContainer } from "#app/comps/stats/WidgetContainer";
import { StatWidget } from "#app/comps/stats/StatWidget";
import config from "#app/config";
import './CampaignBody.scss';
import { Dialogs } from "@client/services/dialogs";
import { AffiliateReferAFriendModal } from "#app/modals/affiliate/AffiliateReferAFriendModal";
import { useQuery } from "@tanstack/react-query";
import { Affiliates } from "#app/services/affiliates";

/**
 * Display the stats of a campaign. Component works as a toggle
 * to show or hide the stats of the campaign
 * @param campaign Campaign to display
 * @returns A stat component with the stats of the campaign
 */
export const CampaignBody = ({campaign}: {
  campaign: UserCampaigns
}) => {

  const [open, setOpen] = useState(false);
  const {t} = useTranslation(["referrals"]);
  const small = useIsMobileLayout();

  const statsQ = useQuery({
    queryKey: ["stats", campaign._id],
    queryFn: () =>
      Affiliates.getCampaignStats({_id : campaign._id, timeIndex: 3 }),
    placeholderData: (prev) => prev,
  });

  const stats = statsQ.data?.stats;
  if(!stats) return null;

  return (<Div fx border borderColor="brown-4" p={small ? 20: 24} column>
    <Div fx justifyContent="space-between" alignItems="center" cursor="pointer"  onClick={() => setOpen(!open)}>
      <Heading as="h3" textTransform="uppercase" size={20} color={open? 'sand': undefined}>{campaign.campaignName}</Heading>
      <Div center gap={small ? 20: 24}>
        <Span>{t('campaigns.comission')}: <Tokens value={stats.commissionAmount} color="light-sand"/></Span>
        <Vector
          className="icon fade-content"         
          as={SvgArrowRight}
          size={12}
          border
          borderColor={'brown-4'}
          px={16}
          height={40}
          style={{transform: open ? "rotate(180deg)" : "rotate(0deg)"}}
          />
      </Div>
    </Div>
    <Div fx gap={16} column mt={open ? (small ? 16: 24): 0}  className={classNames("CampaignBody",{open})}>
       <ModalSection>
        <ModalLabel>{t('campaigns.campaignLink')}</ModalLabel>
        <ModalField color="light-sand" justifyContent="space-between" onClick={() => Dialogs.open('primary',<AffiliateReferAFriendModal commissionRate={campaign.commissionRate * 100} campaignId={campaign.campaignId} />)}>{`${config.siteURL}/r/${campaign.campaignId}`}<Vector as={SvgCopy} /></ModalField>
      </ModalSection>
      <Heading as="h3" mt={small ? 20: 24} textTransform="uppercase">{t('performance.title')}</Heading>
      <WidgetContainer column>
        <WidgetContainer>
          <StatWidget reverse description={t('performance.campaignHits')} title={campaign.campaignHits?.toString() ?? "0"} />
          <StatWidget reverse description={t('performance.referrals')} title={`${stats.referralCount}`} />
          <StatWidget reverse description={t('performance.totalDeposits')} tokens={stats.depositAmount} />
          <StatWidget reverse description={t('performance.availableCommission')} tokens={stats.commissionBalance} />
        </WidgetContainer>
        <WidgetContainer style={{maxWidth: small ? '100%': 'calc((100% - 8px) * 3 / 4)'}}>
          <StatWidget reverse description={t('performance.totalCommission')} tokens={stats.commissionAmount} />
          <StatWidget reverse description={t('performance.uniqueDeposits')} title={`${stats.depositorCount}`} />
          <StatWidget reverse description={t('performance.commissionRate')} title={`${campaign.commissionRate  * 100} %`} />
        </WidgetContainer>
      </WidgetContainer>
    </Div>
  </Div>);
}