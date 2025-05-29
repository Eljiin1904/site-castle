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
// import { BlackjackFairnessResult } from "#core/types/blackjack/BlackjackFairnessResult";
// import { useTranslation } from "@client/hooks/localization/useTranslation";

export const FairnessBlackjackModal = ({ result }: { result: BlackjackFairnessResult }) => {
  const { t } = useTranslation();
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        // heading={t.gameplay("blackjack_result")}
        heading={"Blackjack Result"}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("game_ID")} */}</ModalLabel>
            <ModalCopyField text={result.gameId} />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{/* {t.ui("timestamp")} */}</ModalLabel>
            <ModalField>{Dates.toTimestamp(result.timestamp)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("win_amount")} */}</ModalLabel>
            <ModalField>
              <Tokens value={result.totalPayout} />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("players_cards")} */}</ModalLabel>
            <ModalField>{result.playerCards}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("dealers_cards")} */}</ModalLabel>
            <ModalField>{result.dealerCards}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("client_seed")} */}</ModalLabel>
            <ModalCopyField text={result.clientSeed} />
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("server_seed")} */}</ModalLabel>
            <ModalCopyField text={result.serverSeed || result.serverSeedHashed} />
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("nonce")} */}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{/* {t.gameplay("step")} */}</ModalLabel>
            <ModalCopyField text={result.step.toString()} />
          </ModalSection>
        </Div>
      </ModalBody>
    </Modal>
  );
};
