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
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Span } from "@client/comps/span/Span";
import { Toasts } from "@client/services/toasts";
import { Tokens } from "@client/comps/tokens/Tokens";

export const FairnessDiceModal = ({ result }: { result: DiceResult }) => {
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
        heading="Dice Result"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Game ID"}</ModalLabel>
            <ModalField justify="space-between">
              <Span>{result.gameId}</Span>
              <Vector
                as={SvgCopy}
                color="light-blue"
                size={18}
                hover="highlight"
                onClick={() => handleCopy(result.gameId)}
              />
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Timestamp"}</ModalLabel>
            <ModalField>{Dates.toTimestamp(result.timestamp)}</ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Bet Amount"}</ModalLabel>
            <ModalField>
              <Tokens value={result.betAmount} />
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Multiplier"}</ModalLabel>
            <ModalField>
              {Numbers.floor(Dice.getMultiplier(result), 4).toFixed(4)}
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Bet Type"}</ModalLabel>
            <ModalField>{Strings.kebabToTitle(result.targetKind)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Bet Target"}</ModalLabel>
            <ModalField>
              {Numbers.round(result.targetValue / 100, 2)}
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Roll"}</ModalLabel>
            <ModalField>{Numbers.round(result.rollValue / 100, 2)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Won"}</ModalLabel>
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
