import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { Trans, useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Site } from "@core/services/site";
import { Span } from "@client/comps/span/Span";

export const SingleGameInfoCard = ({game, verificationLink}: {
  game: typeof Site.games[number];
  verificationLink: string;
}) => {
  const {t} = useTranslation(["fairness", "games"]);
  const small = useIsMobileLayout();
  return (
    <Div
      column
      gap={small ? 16 : 24}
    >
      <PageTitle heading={t('singlePlayerGames.title', {game: t(`games:${game}`)})}/>   
      <Paragraph>{t('singlePlayerGames.description1')}</Paragraph>
      <UnorderedList
        items={[
          t('singlePlayerGames.inputs.clientSeed'),
          t('singlePlayerGames.inputs.serverSeed'),
          t('singlePlayerGames.inputs.nonce'),
        ]}
      />
      <Paragraph>{t(`singlePlayerGames.${game}`)}</Paragraph>
      <Button
        kind="tertiary-grey"
        label={t('manageSeeds')}
        onClick={() => Dialogs.open("primary", <FairnessSeedModal />)}
        style={{ maxWidth: "300px" }}
      />
      <Paragraph>{t('independentVerification')}</Paragraph>
      <Link
        type="a"
        href={verificationLink}
      >
        {t('verifyGame')}
      </Link>
      {game === "cases" && 
        <Div fx display="block" fontSize={14}>
          {//@ts-ignore
          <Trans
            i18nKey="fairness:cases.info"
            values={{ unhashed: t("cases.unhashed"), hashed: t("cases.hashed") }}
            components={[
              <Span
                color="light-sand"
              >
                {t("cases.unhashed")}
              </Span>,
              <Span
                color="sand"
              >
                {t("cases.hashed")}
              </Span>,
            ]}
          />}
        </Div>
      }
    </Div>
  );
};
