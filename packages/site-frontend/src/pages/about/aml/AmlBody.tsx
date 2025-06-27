import { LegalSection } from "#app/comps/legal/LegalSection";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { OrderedList } from "@client/comps/list/OrderedList";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Fragment } from "react";

export const AmlBody = () => {

 const { t } = useTranslation(["legal\\aml"]);
 const small = useIsMobileLayout();
  return (
    <Fragment>
      <Div
        column
        gap={small ? 16 : 24}
      >
        <PageTitle heading={t('title')}/>       
        <Paragraph>{t('version',{value: {date: '16 January 2025'}})}</Paragraph>
        <Paragraph>{t('privacy.paragraph1')}</Paragraph>
        <Paragraph>{t('privacy.paragraph2')}</Paragraph>
        <Paragraph>{t('privacy.paragraph3')}</Paragraph>
        <Paragraph>{t('privacy.paragraph4')}</Paragraph>
        <Paragraph>{t('privacy.paragraph5')}</Paragraph>
        <Paragraph>{t('privacy.paragraph6')}</Paragraph>
        <Paragraph>{t('privacy.paragraph7')}</Paragraph>
      </Div>
      <MoneyLaunderingSection/>
      <OrganizationSection/>
      <PolicyChangesSection/>
      <KYCSection/>
      <ProofidentificationSection/>
      <ProofAddressSection/>
      <SourceOfFundsSection/>
      <RiskSection/>
      <OngoingSection/>
      <ReportingSection/>
      <RecordKeepingSection/>
      <TrainingSection/>
      <AuditingSection/>
      <DataSecuritySection/>
      <ContactSection/>
    </Fragment>
  );
};

const MoneyLaunderingSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('moneyLaundering.heading')}>
    <Paragraph>{t('moneyLaundering.paragraph1')}</Paragraph>
    <UnorderedList items={[
      t('moneyLaundering.list.item1'),
      t('moneyLaundering.list.item2'),
      t('moneyLaundering.list.item3'),
      t('moneyLaundering.list.item4')
    ]}
    />
    <Paragraph>{t('moneyLaundering.paragraph2')}</Paragraph>
  </LegalSection>);
};
const OrganizationSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('organization.heading')}>
    <Paragraph>{t('organization.paragraph1')}</Paragraph>
    <Paragraph>{t('organization.paragraph2')}</Paragraph>
    <Paragraph>{t('organization.paragraph3')}</Paragraph>
  </LegalSection>);
};
const PolicyChangesSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('policyChanges.heading')}>
    <Paragraph>{t('policyChanges.paragraph1')}</Paragraph>
    <Heading as="h4">{t('policyChanges.subheading1')}</Heading>
      <Div fx column gap={8}>
      <Paragraph fontStyle={'italic'}>{t('policyChanges.step1')}</Paragraph>
      <Paragraph>{t('policyChanges.step1Paragraph1')}</Paragraph>
      <Paragraph>{t('policyChanges.step1Paragraph2')}</Paragraph>
    </Div>
    <Div fx column gap={8}>
      <Paragraph fontStyle={'italic'}>{t('policyChanges.step2')}</Paragraph>
      <Paragraph>{t('policyChanges.step2Paragraph1')}</Paragraph>
    </Div>
    <Div fx column gap={8}>
      <Paragraph fontStyle={'italic'}>{t('policyChanges.step3')}</Paragraph>
      <Paragraph>{t('policyChanges.step3Paragraph1')}</Paragraph>
    </Div>
  </LegalSection>);
};
const KYCSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('kyc.heading')}>
    <Paragraph>{t('kyc.paragraph1')}</Paragraph>
    <Paragraph>{t('kyc.paragraph2')}</Paragraph>
  </LegalSection>);
};
const ProofidentificationSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('proofIdentification.heading')}>
    <Paragraph>{t('proofIdentification.paragraph1')}</Paragraph>
  </LegalSection>);
};
const ProofAddressSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('proofAddress.heading')}>
    <Paragraph>{t('proofAddress.paragraph1')}</Paragraph>
    <Paragraph>{t('proofAddress.paragraph2')}</Paragraph>
  </LegalSection>);
};
const SourceOfFundsSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('sourceOfFunds.heading')}>
    <Paragraph>{t('sourceOfFunds.paragraph1')}</Paragraph>
    <UnorderedList items={[
      t('sourceOfFunds.list.item1'),
      t('sourceOfFunds.list.item2'),
      t('sourceOfFunds.list.item3'),
      t('sourceOfFunds.list.item4'),
      t('sourceOfFunds.list.item5')
    ]}
    />
    <Paragraph>{t('sourceOfFunds.paragraph2')}</Paragraph>
    <Paragraph>{t('sourceOfFunds.paragraph3')}</Paragraph>
  </LegalSection>);
};
const RiskSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('risk.heading')}>
    <Paragraph>{t('risk.paragraph1')}</Paragraph>
    <Paragraph>{t('risk.paragraph2')}</Paragraph>
    <Heading as="h4">{t('risk.subheading1')}</Heading>
    <Paragraph>{t('risk.paragraph3')}</Paragraph>
    <Paragraph>{t('risk.paragraph4')}</Paragraph>
  </LegalSection>);  
};
const OngoingSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('ongoing.heading')}>
    <Paragraph>{t('ongoing.paragraph1')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph2')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph3')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph4')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph5')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph6')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph7')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph8')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph9')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph10')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph11')}</Paragraph>
    <Paragraph>{t('ongoing.paragraph12')}</Paragraph>
  </LegalSection>);
};
const ReportingSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('reporting.heading')}>
    <Paragraph>{t('reporting.paragraph1')}</Paragraph>
    <Paragraph>{t('reporting.paragraph2')}</Paragraph>
    <Paragraph>{t('reporting.paragraph3')}</Paragraph>
    <Heading as="h4">{t('reporting.subheading1')}</Heading>
    <Paragraph>{t('reporting.paragraph4')}</Paragraph>
  </LegalSection>);
};
const RecordKeepingSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('recordKeeping.heading')}>
    <Paragraph>{t('recordKeeping.paragraph1')}</Paragraph>
    <Paragraph>{t('recordKeeping.paragraph2')}</Paragraph>
    <Paragraph>{t('recordKeeping.paragraph3')}</Paragraph>
  </LegalSection>);
};
const TrainingSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('training.heading')}>
    <Paragraph>{t('training.paragraph1')}</Paragraph>
    <Paragraph>{t('training.paragraph2')}</Paragraph>
    <UnorderedList items={[
      t('training.list.item1'),
      t('training.list.item2')
    ]}
    />
  </LegalSection>);
};
const AuditingSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('auditing.heading')}>
    <Paragraph>{t('auditing.paragraph1')}</Paragraph>
  </LegalSection>);
};
const DataSecuritySection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('dataSecurity.heading')}>
    <Paragraph>{t('dataSecurity.paragraph1')}</Paragraph>
    <Paragraph>{t('dataSecurity.paragraph2')}</Paragraph>
  </LegalSection>);
};
const ContactSection = () => {
  const { t } = useTranslation(["legal\\aml"]);
  return (<LegalSection heading={t('contactUs.heading')}>
    <Paragraph>{t('contactUs.paragraph1')}</Paragraph>
    <UnorderedList items={[
      t('contactUs.list.item1')
    ]}
    />
  </LegalSection>);
};
