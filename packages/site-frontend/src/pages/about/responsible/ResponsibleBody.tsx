import { LegalSection } from "#app/comps/legal/LegalSection";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Trans, useTranslation } from "@core/services/internationalization/internationalization";
import { Fragment } from "react";

export const ResponsibleBody = () => {

  const { t } = useTranslation(["legal\\responsible"]);
  const small = useIsMobileLayout();
   return (
     <Fragment>
       <Div
         column
         gap={small ? 16 : 24}
       >
         <PageTitle heading={t('title')}/>       
         <Paragraph>{t('version',{value: {date: '16 January 2025'}})}</Paragraph>
         <Paragraph>{t('paragraph1')}</Paragraph>
       </Div>
       <ResponsibleSection/>
       <SelfExclusionSection/>
       <MinorSection/>
     </Fragment>
   );
 };
 
 const ResponsibleSection = () => {
   const { t } = useTranslation(["legal\\responsible"]);
   return (<LegalSection heading={t('responsibleGambling.heading')}>
     <Div fx column gap={8}>
      <Paragraph>{t('responsibleGambling.item1')}</Paragraph>
      <UnorderedList items={[
        t('responsibleGambling.list1.item1'),
        t('responsibleGambling.list1.item2'),
        t('responsibleGambling.list1.item3'),
        t('responsibleGambling.list1.item4'),
        t('responsibleGambling.list1.item5'),
        t('responsibleGambling.list1.item6'),
        t('responsibleGambling.list1.item7'),
        t('responsibleGambling.list1.item8')
      ]}
      />
     </Div>
     <Div fx column gap={8}>
      <Paragraph>{t('responsibleGambling.item2')}</Paragraph>
      <UnorderedList items={[
        t('responsibleGambling.list2.item1'),
        t('responsibleGambling.list2.item2'),
        t('responsibleGambling.list2.item3'),
        t('responsibleGambling.list2.item4'),
        t('responsibleGambling.list2.item5'),
        t('responsibleGambling.list2.item6')
      ]}
      />
     </Div>
     <Div fx column gap={8}>
      <Paragraph>{t('responsibleGambling.item3')}</Paragraph>
      <Link
        type="a"
        target="_blank"
        rel="noreferrer"
        href="https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem"
      >
          https://www.begambleaware.org/gambling-problems/do-i-have-a-gambling-problem
      </Link>
     </Div>
     <Div fx column gap={8}>
      <Paragraph>{t('responsibleGambling.item4')}</Paragraph>
      <Link
        type="a"
        target="_blank"
        rel="noreferrer"
        href="https://www.begambleaware.org/safer-gambling"
      >
        https://www.begambleaware.org/safer-gambling
      </Link>        
    </Div>
    <Div fx column gap={8}>
    <Paragraph>{t('responsibleGambling.item5')}</Paragraph>
     <ul>
        <li>
          <Link
            type="a"
            target="_blank"
            rel="noreferrer"
            href="https://www.gamblingtherapy.org"
          >
            Gambling Therapy
          </Link>
        </li>
        <li>
          <Link
            type="a"
            target="_blank"
            rel="noreferrer"
            href="http://www.gamcare.org.uk"
          >
            GamCare
          </Link>
        </li>
      </ul>
    </Div>
   </LegalSection>);
 };
 const SelfExclusionSection = () => {
   const { t } = useTranslation(["legal\\responsible","account"]);
   return (<LegalSection heading={t('selfExclusion.heading')}>
      <Paragraph>
      {
        //@ts-ignore
        <Trans
        i18nKey="legal\responsible:selfExclusion.paragraph1"
        values={{ link1: t("account:settings.title"),link2: t("account:settings.selfExclusion.title") }}
        components={[
          <Link
            type="a"
            href="/account/settings"
            fontWeight="regular"
          >
            {t("account:settings.title")}
          </Link>,
          <Link
            type="a"
           href="/self-exclude"
            fontWeight="regular"
          >
            {t("account:settings.selfExclusion.title")}
          </Link>
        ]}
      />
      }
      </Paragraph>
      <Paragraph>{t('selfExclusion.paragraph2')}</Paragraph>
      <Paragraph>{t('selfExclusion.paragraph3')}</Paragraph>
   </LegalSection>);
 };
 const MinorSection = () => {
  const { t } = useTranslation(["legal\\responsible"]);
  return (<LegalSection heading={t('minorProtection.heading')}>
     <Paragraph>{t('minorProtection.paragraph1')}</Paragraph>
     <Paragraph>{t('minorProtection.paragraph2')}</Paragraph>
     <Link
        target="_blank"
        rel="noreferrer"
        href="https://famisafe.wondershare.com/internet-filter/best-internet-filters.html"
        type="a"
      >
        https://famisafe.wondershare.com/internet-filter/best-internet-filters.html
      </Link>
  </LegalSection>);
};