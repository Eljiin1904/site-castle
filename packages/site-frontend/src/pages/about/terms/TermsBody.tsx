import { LegalSection } from "#app/comps/legal/LegalSection";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { OrderedList } from "@client/comps/list/OrderedList";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Fragment } from "react";

export const TermsBody = () => {

 const { t } = useTranslation(["legal\\terms"]);
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
      <IntroSection/>
      <GeneralSection/>
      <ObligationsSection/>
      <RestrictedUseSection/>
      <RegistrationSection/>
      <AccountSection/>
      <DepositSection/>
      <WithdrawSection/>
      <PaymentSection/>
      <ErrorsSection/>
      <RulesSection/>
      <CommunicationSection/>
      <BeyondOurControlSection/>
      <LiabilitySection/>
      <UnderAgeSection/>
      <FraudControlSection/>
      <IntellectualSection/>
      <LicenseSection/>
      <ConductSection/>
      <LinksSection/>
      <ComplainsSection/>
      <AssignmentSection/>
      <SeverabilitySection/>
      <BreachSection/>
      <GeneralProvisionsSection/>
    </Fragment>
  );
};

const IntroSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('introduction.heading')}>
    <Paragraph>{t('introduction.paragraph1')}</Paragraph>
    <Paragraph>{t('introduction.paragraph2')}</Paragraph>
    <Paragraph>{t('introduction.paragraph3')}</Paragraph>
  </LegalSection>);
};
const GeneralSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('generalTerms.heading')}>
    <Paragraph>{t('generalTerms.paragraph1')}</Paragraph>
  </LegalSection>);
};
const ObligationsSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('obligations.heading')}>
    <Paragraph>{t('obligations.paragraph1')}</Paragraph>
    <OrderedList
    items={[
        t('obligations.list.item1'),
        t('obligations.list.item2'),
        t('obligations.list.item3'),
        t('obligations.list.item4'),
        t('obligations.list.item5'),
        t('obligations.list.item6'),
        t('obligations.list.item7'),
        t('obligations.list.item8'),
        t('obligations.list.item9'),
        t('obligations.list.item10'),
        t('obligations.list.item11'),
        t('obligations.list.item12'),
        t('obligations.list.item13')
      ]}
     />
  </LegalSection>);
};
const RestrictedUseSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('restrictedUse.heading')}>
    <Paragraph>{t('restrictedUse.item1')}</Paragraph>
    <Div column>
      <OrderedList
          start={1}
          items={[
            t('restrictedUse.list.item1'),
            t('restrictedUse.list.item2'),
            t('restrictedUse.list.item3')
          ]}
        />
        <UnorderedList pl={80} pt={0}
          items={[
            t('restrictedUse.countries.item1'),
            t('restrictedUse.countries.item2'),
            t('restrictedUse.countries.item3'),
            t('restrictedUse.countries.item4'),
            t('restrictedUse.countries.item5'),
            t('restrictedUse.countries.item6'),
            t('restrictedUse.countries.item7'),
            t('restrictedUse.countries.item8'),
            t('restrictedUse.countries.item9'),
            t('restrictedUse.countries.item10'),
            t('restrictedUse.countries.item11'),
            t('restrictedUse.countries.item12'),
            t('restrictedUse.countries.item13'),
            t('restrictedUse.countries.item14'),
            t('restrictedUse.countries.item15'),
            t('restrictedUse.countries.item16'),
            t('restrictedUse.countries.item17'),
            t('restrictedUse.countries.item18'),
            t('restrictedUse.countries.item19'),
            t('restrictedUse.countries.item20'),
            t('restrictedUse.countries.item21'),
            t('restrictedUse.countries.item22'),
            t('restrictedUse.countries.item23'),
            t('restrictedUse.countries.item24')
          ]}
        />
        <OrderedList
          start={4}
          items={[
            t('restrictedUse.list.item4'),
            t('restrictedUse.list.item5'),
            t('restrictedUse.list.item6'),
            t('restrictedUse.list.item7'),
            t('restrictedUse.list.item8'),
            t('restrictedUse.list.item9')
          ]}
        />
    </Div>
    <Paragraph>{t('restrictedUse.item2')}</Paragraph>
    <Paragraph>{t('restrictedUse.item3')}</Paragraph>
    <Paragraph>{t('restrictedUse.item4')}</Paragraph>
</LegalSection>);
};
const RegistrationSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('registration.heading')}>
    <Paragraph>{t('registration.paragraph1')}</Paragraph>
    <OrderedList
      start={1}
      items={[
        t('registration.item1'),
        t('registration.item2'),
        t('registration.item3'),
        t('registration.item4'),
        t('registration.item5'),
        t('registration.item6'),
        t('registration.item7'),
        t('registration.item8'),
        t('registration.item9'),
        t('registration.item10')
      ]}
    />
  </LegalSection>);
};
const AccountSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('account.heading')}>
    <Paragraph>{t('account.item1')}</Paragraph>
    <Paragraph>{t('account.item2')}</Paragraph>
    <Paragraph>{t('account.item3')}</Paragraph>
    <Paragraph>{t('account.item4')}</Paragraph>
    <Paragraph>{t('account.item5')}</Paragraph>
    <Paragraph>{t('account.item6')}</Paragraph>
    <Paragraph>{t('account.item7')}</Paragraph>
    <Paragraph>{t('account.item8')}</Paragraph>
    <Paragraph>{t('account.item9')}</Paragraph>
    <Paragraph>{t('account.item10')}</Paragraph>
    <Paragraph>{t('account.item11')}</Paragraph>
  </LegalSection>);
};
const DepositSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('depositOfFunds.heading')}>
      <Paragraph>{t('depositOfFunds.item1')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item2')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item3')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item4')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item5')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item6')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item7')}</Paragraph>
      <Paragraph>{t('depositOfFunds.item8')}</Paragraph>
  </LegalSection>);
};
const WithdrawSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('withdrawalOfFunds.heading')}>
      <Paragraph>{t('withdrawalOfFunds.item1')}</Paragraph>
      <Paragraph>{t('withdrawalOfFunds.item2')}</Paragraph>
      <Paragraph>{t('withdrawalOfFunds.item3')}</Paragraph>
      <Paragraph>{t('withdrawalOfFunds.item4')}</Paragraph>
      <Paragraph>{t('withdrawalOfFunds.item5')}</Paragraph>
      <Paragraph>{t('withdrawalOfFunds.item6')}</Paragraph>
  </LegalSection>);
};
const PaymentSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('payment.heading')}>
    <Paragraph>{t('payment.item1')}</Paragraph>
    <Paragraph>{t('payment.item2')}</Paragraph>
    <Paragraph>{t('payment.item3')}</Paragraph>
  </LegalSection>);
};
const ErrorsSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('errors.heading')}>
    <Paragraph>{t('errors.item1')}</Paragraph>
    <Paragraph>{t('errors.item2')}</Paragraph>
    <Paragraph>{t('errors.item3')}</Paragraph>
  </LegalSection>);
};
const RulesSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('rules.heading')}>
    <OrderedList
      start={1}
      items={[
        t('rules.item1'),
        t('rules.item2'),
        t('rules.item3'),
        t('rules.item4'),
        t('rules.item5'),
        t('rules.item6'),
        t('rules.item7'),
        t('rules.item8'),
        t('rules.item9'),
        t('rules.item10'),
        t('rules.item11'),
        t('rules.item12')
      ]}
    />
  </LegalSection>);
};
const CommunicationSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('communication.heading')}>
    <Paragraph>{t('communication.item1')}</Paragraph>
    <Paragraph>{t('communication.item2')}</Paragraph>
    <Paragraph>{t('communication.item3')}</Paragraph>
    <Paragraph>{t('communication.item4')}</Paragraph>
  </LegalSection>);
};
const BeyondOurControlSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('beyondOurControl.heading')}>
    <Paragraph>{t('beyondOurControl.paragraph1')}</Paragraph>
  </LegalSection>);
};
const LiabilitySection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('liability.heading')}>
    <Paragraph>{t('liability.item1')}</Paragraph>
    <Paragraph>{t('liability.item2')}</Paragraph>
    <Paragraph>{t('liability.item3')}</Paragraph>
  </LegalSection>);
};
const UnderAgeSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('underAge.heading')}>
    <Div column>
      <Paragraph>{t('underAge.item1')}</Paragraph>
      <OrderedList
        start={1}
        items={[
          t('underAge.list.item1'),
          t('underAge.list.item2'),
          t('underAge.list.item3')
        ]}
      />
    </Div>
    <Paragraph>{t('underAge.item2')}</Paragraph>
    <Paragraph>{t('underAge.item3')}</Paragraph>
  </LegalSection>);
};
const FraudControlSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('fraud.heading')}>
    <Paragraph>{t('fraud.paragraph1')}</Paragraph>
  </LegalSection>);
};
const IntellectualSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('intellectual.heading')}>
    <Paragraph>{t('intellectual.item1')}</Paragraph>
    <Paragraph>{t('intellectual.item2')}</Paragraph>
    <Paragraph>{t('intellectual.item3')}</Paragraph>
    <Paragraph>{t('intellectual.item4')}</Paragraph>
  </LegalSection>);
};
const LicenseSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('license.heading')}>
    <Paragraph>{t('license.item1')}</Paragraph>
    <Paragraph>{t('license.item2')}</Paragraph>
    <Paragraph>{t('license.item3')}</Paragraph>
  </LegalSection>);
};
const ConductSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('conduct.heading')}>
    <Paragraph>{t('conduct.item1')}</Paragraph>
    <Paragraph>{t('conduct.item2')}</Paragraph>
    <Div column>
      <Paragraph>{t('conduct.item3')}</Paragraph>
      <OrderedList
          start={1}
          items={[
            t('conduct.list.item1'),
            t('conduct.list.item2'),
            t('conduct.list.item3'),
            t('conduct.list.item4'),
            t('conduct.list.item5'),
            t('conduct.list.item6'),
            t('conduct.list.item7'),
            t('conduct.list.item8'),
            t('conduct.list.item9'),
            t('conduct.list.item10'),
            t('conduct.list.item11'),
            t('conduct.list.item12'),
            t('conduct.list.item13'),
          ]}
        />
    </Div>
    <Paragraph>{t('conduct.paragraph1')}</Paragraph>
  </LegalSection>);
};
const LinksSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('links.heading')}>
    <Paragraph>{t('links.paragraph1')}</Paragraph>
  </LegalSection>);
};
const ComplainsSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('complaints.heading')}>
    <Paragraph>{t('complaints.item1')}</Paragraph>
    <Paragraph>{t('complaints.item2')}</Paragraph>
    <Paragraph>{t('complaints.item3')}</Paragraph>
    <Paragraph>{t('complaints.item4')}</Paragraph>
    <Paragraph>{t('complaints.item5')}</Paragraph>
    <Paragraph>{t('complaints.item6')}</Paragraph>
  </LegalSection>);
};
const AssignmentSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('assignment.heading')}>
    <Paragraph>{t('assignment.paragraph1')}</Paragraph>
  </LegalSection>);
};
const SeverabilitySection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('severability.heading')}>
    <Paragraph>{t('severability.paragraph1')}</Paragraph>
  </LegalSection>);
};
const BreachSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('breach.heading')}>
    <Paragraph>{t('breach.paragraph1')}</Paragraph>
  </LegalSection>);
};
const GeneralProvisionsSection = () => {
  const { t } = useTranslation(["legal\\terms"]);
  return (<LegalSection heading={t('generalProvisions.heading')}>
    <Paragraph>{t('generalProvisions.item1')}</Paragraph>
    <Paragraph>{t('generalProvisions.item2')}</Paragraph>
    <Paragraph>{t('generalProvisions.item3')}</Paragraph>
    <Paragraph>{t('generalProvisions.item4')}</Paragraph>
    <Paragraph>{t('generalProvisions.item5')}</Paragraph>
    <Paragraph>{t('generalProvisions.item6')}</Paragraph>
    <Paragraph>{t('generalProvisions.item7')}</Paragraph>
    <Paragraph>{t('generalProvisions.item8')}</Paragraph>
    <Paragraph>{t('generalProvisions.item9')}</Paragraph>
    <Paragraph>{t('generalProvisions.item10')}</Paragraph>
  </LegalSection>);
};
