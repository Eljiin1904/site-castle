import { DiceResult } from "@core/types/dice/DiceResult";
import { Dates } from "@core/services/dates";
import { Dice } from "@core/services/dice";
import { Numbers } from "@core/services/numbers";
import { Strings } from "@core/services/strings";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const FairnessDiceModal = ({ result }: { result: DiceResult }) => {
  const {t} = useTranslation(["fairness"]);
  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('modal.title.dice')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div borderTop fx gap={12}>
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
          <ModalSection>
            <ModalLabel>{t('transactions.headers.multiplier')}</ModalLabel>  
            <ModalField>{Numbers.floor(Dice.getMultiplier(result), 4).toFixed(4)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.betType')}</ModalLabel>
            <ModalField>{Strings.kebabToTitle(result.targetKind)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.betAmount')}</ModalLabel>
            <ModalField>{Numbers.round(result.targetValue / 100, 2)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.roll')}</ModalLabel>
            <ModalField>{Numbers.round(result.rollValue / 100, 2)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.won')}</ModalLabel>
            <ModalField>
              <Tokens value={result.wonAmount} fontSize={12} color="dark-sand"/>
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t('transactions.headers.clientSeed')}</ModalLabel>
            <ModalCopyField text={result.clientSeed} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('transactions.headers.nonce')}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} color="light-sand" fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t('transactions.headers.serverSeed')}</ModalLabel>
          <ModalCopyField text={result.serverSeed ?? result.serverSeedHashed} color={result.serverSeed ? "light-sand" : "sand"} fontSize={12} lineHeight={16} textOverflow="ellipsis"/>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
