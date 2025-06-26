import { CaseBattleResult } from "@core/types/case-battles/CaseBattleResult";
import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Button } from "@client/comps/button/Button";
import { CaseBattles } from "#app/services/case-battles";
import config from "#app/config";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const FairnessCaseBattleModal = ({
  result,
}: {
  result: CaseBattleResult;
}) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.battles')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Link
          fx
          type="a"
          href={`${config.siteURL}/case-battles/${result.gameId}`}
          hover="none"
          gap={12}
        >
          <Button
            fx
            kind="primary-yellow"
            label={t('games\\case-battles:viewBattle')}
          />
        </Link>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.gameId')}</ModalLabel>
            <ModalField>{result.gameId}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.date')}</ModalLabel>
            <ModalField>{Dates.toTimestamp(result.timestamp)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
        <ModalSection>
        <ModalLabel>{t('transactions.headers.battle')}</ModalLabel>
          <ModalField>
            {`${CaseBattles.getModeCategory(result.mode)} - ${Strings.kebabToTitle(result.mode)}`}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.modifiers')}</ModalLabel>
          <ModalField>
            {result.modifiers.map((x) => Strings.kebabToTitle(x)).join(", ") ||
              "--"}
          </ModalField>
        </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.winners')}</ModalLabel>
            <ModalField>
              {result.winners.map((x) => `P${x + 1}`).join(",")}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.pot')}</ModalLabel>
            <ModalField>
              <Tokens value={result.totalWon} color="dark-sand" fontSize={12} />
            </ModalField>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
          <ModalCopyField text={result.serverSeed} color={'light-sand'} fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.eosBlockId')}</ModalLabel>
          <ModalCopyField text={result.eosBlockId} color={'light-sand'} fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
