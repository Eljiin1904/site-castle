import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { PageTitle } from "@client/comps/page/PageTitle";

export const CrashInfoCard = ({verificationLink}: {
  verificationLink: string;
}) => {
  
  const {t} = useTranslation(["fairness"]);
  const small = useIsMobileLayout();
  return (
    <Div
      column
      gap={small ? 16 : 24}
    >
      <PageTitle heading={t('crash.title')}/>   
      <Paragraph>{t('crash.description1')}</Paragraph>
      <Paragraph>{t('crash.description2')}</Paragraph>
      <Paragraph>{t('crash.description3')}</Paragraph>
      <Paragraph>{t('crash.description4')}</Paragraph>
      <UnorderedList
        items={[
          t('crash.inputs.serverSeed'),
          t('crash.inputs.clientSeed')
        ]}
      />
     <Paragraph>{t('crash.description5')}</Paragraph>
      <Paragraph>{t('independentVerificationNotNonce')}</Paragraph>
      <Link
        type="a"
        href={verificationLink}
      >
        {t('verifyGame')}
      </Link>
    </Div>
  );
};
