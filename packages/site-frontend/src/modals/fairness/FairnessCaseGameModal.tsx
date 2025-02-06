import { ChestGameResult } from "@core/types/chests/ChestGameResult";
import { Dates } from "@core/services/dates";
import { Items } from "@core/services/items";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Span } from "@client/comps/span/Span";
import { Toasts } from "@client/services/toasts";

export const FairnessCaseGameModal = ({
  result,
}: {
  result: ChestGameResult;
}) => {
  const handleCopy = (text: string | number) => {
    navigator.clipboard.writeText(`${text}`);
    Toasts.success("Copied to clipboard.");
  };

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Case Game Result"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div
          display="block"
          fontSize={14}
        >
          {"You must use the "}
          <Span
            color="light-blue"
            weight="semi-bold"
          >
            {"unhashed"}
          </Span>
          {" server seed to verify your results. If you see a "}
          <Span
            color="orange"
            weight="semi-bold"
          >
            {"hashed"}
          </Span>
          {" server seed, you must rotate it on the info page to unhashed it."}
        </Div>
        <Div
          fx
          borderTop
        />
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Game ID"}</ModalLabel>
            <ModalField>{result.gameId}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Timestamp"}</ModalLabel>
            <ModalField>{Dates.toTimestamp(result.timestamp)}</ModalField>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{"Case"}</ModalLabel>
          <ModalField>{result.chest.displayName}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Item"}</ModalLabel>
          <ModalField>{Items.getName(result.loot)}</ModalField>
        </ModalSection>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Roll"}</ModalLabel>
            <ModalField>{result.roll}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Won"}</ModalLabel>
            <ModalField>
              <Tokens value={result.loot.lootValue} />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Client Seed"}</ModalLabel>
            <ModalField justify="space-between">
              <Span
                weight="medium"
                textOverflow="ellipsis"
              >
                {result.clientSeed}
              </Span>
              <Vector
                as={SvgCopy}
                color="light-blue"
                size={18}
                hover="highlight"
                onClick={() => handleCopy(result.clientSeed)}
              />
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Nonce"}</ModalLabel>
            <ModalField justify="space-between">
              <Span
                weight="medium"
                textOverflow="ellipsis"
              >
                {result.nonce}
              </Span>
              <Vector
                as={SvgCopy}
                color="light-blue"
                size={18}
                hover="highlight"
                onClick={() => handleCopy(result.nonce.toString())}
              />
            </ModalField>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{"Server Seed"}</ModalLabel>
          <ModalField justify="space-between">
            <Span
              weight="medium"
              textOverflow="ellipsis"
              color={result.serverSeed ? "light-blue" : "orange"}
            >
              {result.serverSeed || result.serverSeedHashed}
            </Span>
            <Vector
              as={SvgCopy}
              color="light-blue"
              size={18}
              hover="highlight"
              onClick={() =>
                handleCopy(result.serverSeed || result.serverSeedHashed)
              }
            />
          </ModalField>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
