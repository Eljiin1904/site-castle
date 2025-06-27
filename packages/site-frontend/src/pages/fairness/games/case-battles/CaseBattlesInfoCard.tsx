import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { PageTitle } from "@client/comps/page/PageTitle";

export const CaseBattlesInfoCard = ({verificationLink}: {
  verificationLink: string;
}) => {
  
  const {t} = useTranslation(["fairness"]);
  const small = useIsMobileLayout();
  return (
    <Div
      column
      gap={small ? 16 : 24}
    >
      <PageTitle heading={t('battles.title')}/>   
      <Paragraph>{t('battles.description1')}</Paragraph>
      <UnorderedList
        items={[
          t('battles.inputs.serverSeed'),
          t('battles.inputs.eosBlockId'),
          t('battles.inputs.roundId'),
        ]}
      />
      <Paragraph>{t('battles.description2')}</Paragraph>
      <Paragraph>{t('battles.description3')}</Paragraph>
      <Paragraph>{t('independentVerification')}</Paragraph>
      <Link
        type="a"
        href={verificationLink}
      >
        {t('verifyGame')}
      </Link>
    </Div>
  );
};
