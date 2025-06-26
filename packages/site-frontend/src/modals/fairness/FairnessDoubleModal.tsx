import { DoubleResult } from "@core/types/double/DoubleResults";
import { Dates } from "@core/services/dates";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Double } from "#app/services/double";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const FairnessDoubleModal = ({ result }: { result: DoubleResult }) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.double')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div fx gap={12}>
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
          <ModalLabel>{t('transactions.headers.bet')}</ModalLabel>
            <ModalField>
              {Double.getLabelFromBetKind(result.betKind)}
            </ModalField>
          </ModalSection>
          <ModalSection>
          <ModalLabel>{t('transactions.headers.betAmount')}</ModalLabel>
            <ModalField>
              <Tokens value={result.betAmount} color="dark-sand" fontSize={12}/>
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.roll')}</ModalLabel>
            <ModalField>{result.roll.value}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.result')}</ModalLabel>
            <ModalField>
              {Double.getLabelFromRoll(result.roll.value)}
            </ModalField>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.roundId')}</ModalLabel>
          <ModalCopyField text={result.roundId} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.eosBlockId')}</ModalLabel>
          <ModalCopyField text={result.eosBlockId} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
          <ModalCopyField text={result.serverSeed} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
