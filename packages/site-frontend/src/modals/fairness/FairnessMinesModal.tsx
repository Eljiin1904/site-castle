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
// import { useTranslation } from "@client/hooks/localization/useTranslation";

export const FairnessMinesModal = ({ result }: { result: MinesResult }) => {
  const { t } = useTranslation();
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        // heading={t.gameplay("mines_result")}
        heading={"Mines Result"}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>
              {/* {t.gameplay("game_id")} */}
              heading={"Game Id"}
            </ModalLabel>
            <ModalCopyField text={result.gameId} />
          </ModalSection>
          <ModalSection>
            <ModalLabel>
              {/* {t.ui("timestamp")} */}
              {"Timestamp"}
            </ModalLabel>
            <ModalField>{Dates.toTimestamp(result.timestamp)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>
              {/* {t.gameplay("bet_amount")} */}
              {"Bet Amount"}
            </ModalLabel>
            <ModalField>
              <Tokens value={result.betAmount} />
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>
              {/* {t.gameplay("grid_size")} */}
              {"Grid Size"}
            </ModalLabel>
            <ModalField>{result.gridSize}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>
              {/* {t.gameplay("mine_count")} */}
              {"Mine Count"}
            </ModalLabel>
            <ModalField>{result.mineCount}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>
              {/* {t.gameplay("reveal_count")} */}
              "Reveal Count"
            </ModalLabel>
            <ModalField>{result.revealCount}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t.gameplay("multiplier")}</ModalLabel>
            <ModalField>{result.multiplier.toFixed(2)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t.gameplay("won")}</ModalLabel>
            <ModalField>
              <Tokens value={result.wonAmount} />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{t.gameplay("client_seed")}</ModalLabel>
            <ModalCopyField text={result.clientSeed} />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t.gameplay("nonce")}</ModalLabel>
            <ModalCopyField text={result.nonce.toString()} />
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{t.gameplay("server_seed")}</ModalLabel>
          <ModalCopyField text={result.serverSeed || result.serverSeedHashed} />
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
