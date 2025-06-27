import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Fragment } from "react";

export const InfoBody = () => {

 const { t } = useTranslation(["fairness"]);
 const small = useIsMobileLayout();
  return (
    <Fragment>
      <Div
        column
        gap={small ? 16 : 24}
      >
        <PageTitle heading={t('overview.whatsProvablyFair')}/>       
        <Paragraph>{t('overview.whatsProvablyFairContent')}</Paragraph>
        <Paragraph>{t('overview.whatsProvablyFairContent2')}</Paragraph>
      </Div>
      <Div
        column
        gap={small ? 16 : 24}
      >
        <PageTitle heading={t('overview.howDoesThatMakeitFair')}/>
        <Paragraph>{t('overview.howDoesThatMakeitFairContent')}</Paragraph>
        <Paragraph>{t('overview.howDoesThatMakeitFairContent2')}</Paragraph>
        <Paragraph>{t('overview.howDoesThatMakeitFairContent3')}</Paragraph>
        <Paragraph>{t('overview.howDoesThatMakeitFairContent4')}</Paragraph>
        <Paragraph>{t('overview.howDoesThatMakeitFairContent5')}</Paragraph>
      </Div>
      <Button
        kind="tertiary-grey"
        label={t('manageSeeds')}
        width={undefined}
        onClick={() => Dialogs.open("primary", <FairnessSeedModal />)}
      />
    </Fragment>
  );
};
