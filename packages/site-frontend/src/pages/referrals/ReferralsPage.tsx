import { Fragment } from "react";
import { Span } from "@client/comps/span/Span";
import { SitePage } from "#app/comps/site-page/SitePage";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useTranslation , Trans } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { ReferralsBody } from "./ReferralsBody";
import { Affiliates } from "@core/services/affiliates";
import { useAffiliateTier } from "#app/hooks/affiliates/useAffiliateTier";
import { ReferralsManager } from "./ReferralsManager";

/**
 * Referrals Entry Page, contains the Banner and the ReferralsBody components
 * @returns 
 */
export const ReferralsPage = () => {

  const {t} = useTranslation(['referrals']);
  return (<Fragment>
    <SitePage
      className="AffiliatePage"
      title={t('title')}
      privileged
    >
      <ReferralBanner />
      <ReferralsManager />
      <ReferralsBody />
    </SitePage>
    </Fragment>
  );
};

/**
 * Referral Banner, contains the banner image and the referral text
 * Referral rate is calculated based on the current tier
 * @returns 
 */
const ReferralBanner = () => {

  const { tier } = useAffiliateTier();
  const info = Affiliates.getTierInfo(tier);
  const {t} = useTranslation(['referrals']);
  const small = useIsMobileLayout();
  
  return (<PageBanner image={`/graphics/referral-tile`} height={184} smallHeight={120} heading={t(`banner.title`)} description="" content={<Span color="dark-brown" width={small? 280: 400}>
    {//@ts-ignore
    <Trans
      i18nKey="referrals:banner.subtitle"
      values={{percent: `${info.rate * 100}%` }}
      components={[
        <Span
          color="light-sand"
          bg="dark-brown"
          fontSize={small ? 12 : 16} 
          p={2} 
          mx={4}
        >{info.rate * 100}%</Span>,
      ]}
    />
    }
    </Span>
  }/>);
};
