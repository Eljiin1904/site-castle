import { LegalSection } from "#app/comps/legal/LegalSection";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { OrderedList } from "@client/comps/list/OrderedList";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Fragment } from "react";

export const KycBody = () => {

 const { t } = useTranslation(["legal\\kyc"]);
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
      <GuidelineSection/>
      <NotesSection/>
    </Fragment>
  );
};

const IntroSection = () => {
  const { t } = useTranslation(["legal\\kyc"]);
  return (<LegalSection>
    <Paragraph>{t('paragraph1')}</Paragraph>
    <Paragraph>{t('paragraph2')}</Paragraph>
    <Paragraph>{t('paragraph3')}</Paragraph>
  </LegalSection>);
};
const GuidelineSection = () => {
  const { t } = useTranslation(["legal\\kyc"]);
  return (<LegalSection heading={t('guideline.heading')}>
   <Div fx column gap={8}>
    <OrderedList items={[t('guideline.item1')]}/>
    <OrderedList pl={80} items={[
      t('guideline.list1.item1'),
      t('guideline.list1.item2'),
    ]}
    type="a"
    />
   </Div>
   <Div fx column gap={8}>
    <OrderedList items={[t('guideline.item2')]} start={2}/>
    <OrderedList pl={80} items={[
      t('guideline.list2.item1'),
      t('guideline.list2.item2'),
      t('guideline.list2.item3')
    ]}
    type="a"
    />
   </Div>
   <Div fx column gap={8}>
    <OrderedList items={[t('guideline.item3')]} start={3}/>
    <OrderedList pl={80} items={[
      t('guideline.list3.item1'),
      t('guideline.list3.item2'),
    ]}
    type="a"
    />
   </Div>
  </LegalSection>);
};
const NotesSection = () => {
  const { t } = useTranslation(["legal\\kyc"]);
  return (<LegalSection heading={t('notes.heading')}>
    <OrderedList items={[
      t('notes.note1'),
      t('notes.note2'),
    ]}
    />
  </LegalSection>);
};