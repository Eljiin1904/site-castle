import { StatWidget } from "#app/comps/stats/StatWidget";
import { WidgetContainer } from "#app/comps/stats/WidgetContainer";
import { useAffiliateTier } from "#app/hooks/affiliates/useAffiliateTier";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgDoubleBaitIcon } from "#app/svgs/double/SvgDoubleBaitIcon";
import { SvgTotalReferrals } from "#app/svgs/referrals/SvgTotalReferrals";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { Span } from "@client/comps/span/Span";
import { SvgCrash } from "@client/svgs/common/SvgCrash";
import { SvgQuestionCircle } from "@client/svgs/common/SvgQuestionCircle";
import { Affiliates } from "@core/services/affiliates";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Dialogs } from "@client/services/dialogs";
import { AffiliateReloadModal } from "#app/modals/affiliate/AffiliateReloadModal";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { AffiliateHowItWorksModal } from "#app/modals/affiliate/AffiliateHowItWorksModal";

export const ReferralsStats = () => {
  
  const commissionBalance = useAppSelector((x) => x.affiliates.totalComission);
  const commissionTotal =useAppSelector((x) => x.affiliates.totalComission); 
  const referralCount = useAppSelector((x) => x.affiliates.referredFriends);
  const referralWagered = useAppSelector((x) => x.affiliates.totalFriendsWagered);
  const baseTier = useAppSelector((x) => x.user.affiliate.baseTier);
  const { tier, tierProgress, tierGoal } = useAffiliateTier();
  const nextTier = Math.min(tier + 1, Affiliates.tiers.length - 1);
  const info = Affiliates.getTierInfo(tier);
  const nextInfo = Affiliates.getTierInfo(nextTier);  
  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();
  
  return (<Div
      fx
      column
      gap={small ? 16: 40}
      wrap={small}
    >
      <Div fx justifyContent="space-between" alignItems="center">
        <PageTitle
          heading={t('yourReferrals')}
          mt={small ? 0 : 16}
        />
        <Button label={t('howItWorks.button')} kind="tertiary-grey" onClick={() => Dialogs.open('primary',<AffiliateHowItWorksModal />)} iconLeft={SvgQuestionCircle} />
      </Div>

      <WidgetContainer column={small}>
        <WidgetContainer column flexGrow={2} flexBasis={0}>
          <WidgetContainer>
            <StatWidget
              tokens={commissionBalance}
              description={t('unclaimed')}
              withAction
              button={<Button kind="primary-black" label="Claim" size="lg"  onClick={() => Dialogs.open("primary", <AffiliateReloadModal/>)}></Button>}
            />
            <StatWidget
            tokens={commissionTotal}
            description={t('totalCommissionEarned')}
            icon={SvgBets}
            />
          </WidgetContainer>
          <WidgetContainer>
            <StatWidget
              title={`${referralCount}`}
              description={t('totalFriendsReferred')}
              icon={SvgTotalReferrals}
            />
            <StatWidget
            tokens={referralWagered}
            description={t('totalFriedsWagered')}
            icon={SvgDoubleBaitIcon}
            />
          </WidgetContainer>
        </WidgetContainer>        
        <Div fx column flexGrow={1} flexBasis={0} border borderColor="brown-4" px={small ? 20: 24}>
          {baseTier && <StatWidget
            title={t('tier',{baseTier})}
            description={t('baseTier',{baseTier})}
            icon={SvgInfoCircle}
            border={false}
            px={0}
            flexBasis={0}
          />}
          <StatWidget
            title={t('tier',{tier})}
            description={t('commissionTier')}
            icon={SvgCrash}
            border={false}
            alignItems="flex-start" 
            px={0}
            flexBasis={0}  
          />
          <Div fx column gap={16} py={small? 20: 24} flexGrow={1}  flexBasis={0}>
            <Span>{t('commissionProgress')}</Span>
            <ProgressBar height={8}  progress={tierProgress / tierGoal} />
            <Div fx justifyContent="space-between">
              <Paragraph>
              {t('tier',{tier})}:
              <Span ml={4} color="light-sand">{`${info.rate * 100}%`}</Span>
              </Paragraph>
              <Paragraph>
                {t('tier',{tier:nextTier})}:
                <Span ml={4} color="light-sand">{`${nextInfo.rate * 100}%`}</Span>
              </Paragraph>
              </Div>
          </Div>
        </Div>   
      </WidgetContainer> 
    </Div>);
};