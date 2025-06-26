import { Dates } from "@core/services/dates";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { BlackjackFairnessResult } from "@core/types/blackjack/BlackjackFairnessDocument";
import { useTranslation } from "@core/services/internationalization/internationalization";


export const FairnessBlackjackModal = ({ result }: { result: BlackjackFairnessResult }) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.blackjack')}
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
            <ModalLabel>{t('transactions.headers.wonAmount')}</ModalLabel>
            <ModalField>
              <Tokens value={result.totalPayout} color="dark-sand" fontSize={12} />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.playerCards')}</ModalLabel>
            <ModalField>{result.playerCards}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.dealerCards')}</ModalLabel>
            <ModalField>{result.dealerCards}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.clientSeed')}</ModalLabel>
            <ModalCopyField text={result.clientSeed} color="light-sand"/>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
            <ModalCopyField color={result.serverSeed ? 'light-sand': 'sand'} text={result.serverSeed || result.serverSeedHashed} />
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.nonce')}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} color="light-sand"/>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.step')}</ModalLabel>
            <ModalCopyField text={result.step.toString()} color="light-sand"/>
          </ModalSection>
        </Div>
      </ModalBody>
    </Modal>
  );
};
