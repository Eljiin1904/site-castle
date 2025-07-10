import { MinesResult } from "@core/types/mines/MinesResult";
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
import { useTranslation } from "@core/services/internationalization/internationalization";

export const FairnessMinesModal = ({ result }: { result: MinesResult }) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.mines')}
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
              <Tokens value={result.betAmount} color="dark-sand" fontSize={12}/>
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.gridSize')}</ModalLabel>
            <ModalField>{result.gridSize}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.mineCount')}</ModalLabel>
            <ModalField>{result.mineCount}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.revealCount')}</ModalLabel>
            <ModalField>{result.revealCount}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.won')}</ModalLabel>
            <ModalField>
              <Tokens value={result.wonAmount} fontSize={12} color="dark-sand" />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.clientSeed')}</ModalLabel>
            <ModalCopyField text={result.clientSeed} color="light-sand"  textOverflow="ellipsis" />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} color="light-sand" textOverflow="ellipsis"/>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
          <ModalCopyField text={result.serverSeed || result.serverSeedHashed} color={result.serverSeed ? 'light-sand': 'sand'} textOverflow="ellipsis"/>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
