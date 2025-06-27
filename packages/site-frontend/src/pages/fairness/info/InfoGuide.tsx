import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Dialogs } from "@client/services/dialogs";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const InfoGuide = () => {
  const { t } = useTranslation(["fairness"]);
  return (
    <Div
      fx
      column
      gap={40}
    >
      <Div
        column
        gap={16}
      >
        <PageTitle
          heading={t('overview.whatsProvablyFair')}
        />       
        <Paragraph>
          {t('overview.whatsProvablyFairContent')}
        </Paragraph>
        <Paragraph>
        {t('overview.whatsProvablyFairContent2')}
        </Paragraph>
      </Div>
      <Div
        column
        gap={16}
      >
        <PageTitle
          heading={t('overview.howDoesThatMakeitFair')}
        />
        <Paragraph>
          {t('overview.howDoesThatMakeitFairContent')}
        </Paragraph>
        <Paragraph>
          {
           t('overview.howDoesThatMakeitFairContent2')
          }
        </Paragraph>
        <Paragraph>
          {
            t('overview.howDoesThatMakeitFairContent3')
          }
        </Paragraph>
      </Div>
      <Paragraph>
        {
         t('overview.howDoesThatMakeitFairContent4')
        }
      </Paragraph>
      <Button
        kind="primary-yellow"
        label={t('overview.manageSeeds')}
        onClick={() => Dialogs.open("primary", <FairnessSeedModal />)}
      />
    </Div>
  );
};
