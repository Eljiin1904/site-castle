import { LegalSection } from "#app/comps/legal/LegalSection";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { OrderedList } from "@client/comps/list/OrderedList";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Fragment } from "react";

export const PrivacyBody = () => {

 const { t } = useTranslation(["legal//privacy"]);
 const small = useIsMobileLayout();
  return (
    <Fragment>
      <Div
        column
        gap={small ? 16 : 24}
      >
        <PageTitle heading={t('title')}/>       
        <Paragraph>{t('version',{value: {date: '16 January 2025'}})}</Paragraph>
      </Div>
      <PrivacySecion />
      <InformationCollectedSecion />
      <CollectionDataSecion />
      <InformationUseSecion />
      <DisclosuresSecion />
      <AccessSecion />
      <CookiesSecion />
      <ConsentElectronicServiceSecion />
      <ConsentSecuritySecion />
      <SecuritySecion />
      <ProtectionMinorsfersSecion />
      <InternationalTransfersSecion />
      <ThirdPartySecion />
      <LegalDisclaimerSecion />
      <ConsentSection />
      <OtherWebsitesSecion />
    </Fragment>
  );
};

const PrivacySecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('privacy.heading')}>
    <Paragraph>{t('privacy.paragraph1')}</Paragraph>
    <Paragraph>{t('privacy.paragraph2')}</Paragraph>
    <Paragraph>{t('privacy.paragraph3')}</Paragraph>
    <Paragraph>{t('privacy.paragraph4')}</Paragraph>
  </LegalSection>);
};
const InformationCollectedSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('informationCollected.heading')}>
    <Paragraph>{t('informationCollected.paragraph1')}</Paragraph>
    <Paragraph>{t('informationCollected.paragraph2')}</Paragraph>
  </LegalSection>);
};
const CollectionDataSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('collectionData.heading')}>
    <Paragraph>{t('collectionData.paragraph1')}</Paragraph>
    <Paragraph>{t('collectionData.paragraph2')}</Paragraph>
  </LegalSection>);
};
const InformationUseSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('informationUse.heading')}>
    <Paragraph>{t('informationUse.paragraph1')}</Paragraph>
    <Paragraph>{t('informationUse.paragraph2')}</Paragraph>
  </LegalSection>);
};
const DisclosuresSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('disclosures.heading')}>
    <Paragraph>{t('disclosures.paragraph1')}</Paragraph>
  </LegalSection>);
};
const AccessSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('access.heading')}>
    <Paragraph>{t('access.paragraph1')}</Paragraph>
    <Paragraph>{t('access.paragraph2')}</Paragraph>
  </LegalSection>);
};
const CookiesSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('cookies.heading')}>
    <Div fx column gap={8}>
      <Heading as="h4">{t('cookies.subheading1')}</Heading>
      <Paragraph>{t('cookies.paragraph1')}</Paragraph>
    </Div>
    <Div fx column gap={8}>
      <Heading as="h4">{t('cookies.subheading2')}</Heading>
      <Paragraph>{t('cookies.paragraph2')}</Paragraph>
    </Div>
    <Div fx column gap={8}>
      <Heading as="h4">{t('cookies.subheading3')}</Heading>
      <Paragraph>{t('cookies.paragraph3')}</Paragraph>
    </Div>
    <Div fx column gap={8}>
      <Heading as="h4">{t('cookies.subheading4')}</Heading>
      <Paragraph>{t('cookies.paragraph4')}</Paragraph>
      <OrderedList items={[
        t('cookies.list.item1'),
        t('cookies.list.item2'),
        t('cookies.list.item3'),
      ]}/>
      <Paragraph>{t('cookies.paragraph5')}</Paragraph>
      <Paragraph>{t('cookies.paragraph6')}</Paragraph>
    </Div>
  </LegalSection>);
};
const ConsentElectronicServiceSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('consentElectronicServiceProviders.heading')}>
    <Paragraph>{t('consentElectronicServiceProviders.paragraph1')}</Paragraph>
  </LegalSection>);
};
const ConsentSecuritySecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('consentSecurityReview.heading')}>
    <Paragraph>{t('consentSecurityReview.paragraph1')}</Paragraph>
  </LegalSection>);
};
const SecuritySecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('security.heading')}>
    <Paragraph>{t('security.paragraph1')}</Paragraph>
  </LegalSection>);
};
const ProtectionMinorsfersSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('protectionMinors.heading')}>
    <Paragraph>{t('protectionMinors.paragraph1')}</Paragraph>
  </LegalSection>);
};
const InternationalTransfersSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('internationalTransfers.heading')}>
    <Paragraph>{t('internationalTransfers.paragraph1')}</Paragraph>
  </LegalSection>);
};
const ThirdPartySecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('thirdParty.heading')}>
    <Paragraph>{t('thirdParty.paragraph1')}</Paragraph>
  </LegalSection>);
};
const LegalDisclaimerSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('legalDisclaimer.heading')}>
    <Paragraph>{t('legalDisclaimer.paragraph1')}</Paragraph>
    <Paragraph>{t('legalDisclaimer.paragraph2')}</Paragraph>
  </LegalSection>);
};
const ConsentSection = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('consent.heading')}>
    <Paragraph>{t('consent.paragraph1')}</Paragraph>
    <Paragraph>{t('consent.paragraph2')}</Paragraph>
    <Paragraph>{t('consent.paragraph3')}</Paragraph>
  </LegalSection>);
};
const OtherWebsitesSecion = () => {
  const { t } = useTranslation(["legal//privacy"]);
  return (<LegalSection heading={t('otherWebsites.heading')}>
    <Paragraph>{t('otherWebsites.paragraph1')}</Paragraph>
    <Paragraph>{t('legalDisclaimer.paragraph2')}</Paragraph>
  </LegalSection>);
};