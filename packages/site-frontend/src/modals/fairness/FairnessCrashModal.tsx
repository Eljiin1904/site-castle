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
import { CrashResult } from "@core/types/crash/CrashResult";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const FairnessCrashModal = ({ result }: { result: CrashResult }) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.crash')}
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
          <ModalLabel>{t('transactions.headers.cashoutAt')}</ModalLabel>
            <ModalField>
              {result.cashoutMultiplier? `${result.cashoutMultiplier}x` : "--"}
            </ModalField>
          </ModalSection>
          <ModalSection>
          <ModalLabel>{t('transactions.headers.betAmount')}</ModalLabel>
            <ModalField>
              <Tokens value={result.betAmount} fontSize={12} color="dark-sand"/>
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.roundMultiplier')}</ModalLabel>
            <ModalField>{result.multiplier}x</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.roundId')}</ModalLabel>
            <ModalField>{result.roundId}</ModalField>
          </ModalSection>
        </Div>       
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverHash')}</ModalLabel>
          <ModalCopyField text={result.serverHash} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.clientHash')}</ModalLabel>
          <ModalCopyField text={result.clientHash} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};