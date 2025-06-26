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
import { Limbo } from "#app/services/limbo";
import { LimboResult } from "@core/types/limbo/LimboResult";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const FairnessLimboModal = ({ result }: { result: LimboResult }) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.limbo')}
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
            <ModalLabel>{t('transactions.headers.betAmount')}</ModalLabel>
            <ModalField>
              <Tokens value={result.betAmount} fontSize={12} color="dark-sand" />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
          <ModalLabel>{t('transactions.headers.roll')}</ModalLabel>
            <ModalField>{result.rollValue}</ModalField>
          </ModalSection>
          <ModalSection>
          <ModalLabel>{t('transactions.headers.result')}</ModalLabel>
            <ModalField>
              {Limbo.getMultiplier({ targetValue: result.rollValue })}
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.clientSeed')}</ModalLabel>
            <ModalCopyField text={result.clientSeed} color="light-sand" fontSize={12} lineHeight={16}/>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.nonce')}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} color="light-sand" fontSize={12} lineHeight={16}/>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
          <ModalCopyField text={result.serverSeed ?? result.serverSeedHashed}  color={result.serverSeed ? "light-sand" : "sand"} fontSize={12} lineHeight={16}/>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
