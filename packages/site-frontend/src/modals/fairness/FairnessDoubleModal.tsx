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
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Span } from "@client/comps/span/Span";
import { Toasts } from "@client/services/toasts";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Double } from "#app/services/double";

export const FairnessDoubleModal = ({ result }: { result: DoubleResult }) => {
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
        heading="Double Result"
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
            <ModalLabel>{"Bet"}</ModalLabel>
            <ModalField>
              {Double.getLabelFromBetKind(result.betKind)}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Bet Amount"}</ModalLabel>
            <ModalField>
              <Tokens value={result.betAmount} />
            </ModalField>
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Roll"}</ModalLabel>
            <ModalField>{result.roll.value}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Result"}</ModalLabel>
            <ModalField>
              {Double.getLabelFromRoll(result.roll.value)}
            </ModalField>
          </ModalSection>
        </Div>
        <ModalSection>
          <ModalLabel>{"Round ID"}</ModalLabel>
          <ModalField justify="space-between">
            <Span
              weight="medium"
              textOverflow="ellipsis"
            >
              {result.roundId}
            </Span>
            <Vector
              as={SvgCopy}
              color="light-blue"
              size={18}
              hover="highlight"
              onClick={() => handleCopy(result.roundId)}
            />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"EOS Block ID"}</ModalLabel>
          <ModalField justify="space-between">
            <Span
              weight="medium"
              textOverflow="ellipsis"
            >
              {result.eosBlockId}
            </Span>
            <Vector
              as={SvgCopy}
              color="light-blue"
              size={18}
              hover="highlight"
              onClick={() => handleCopy(result.eosBlockId)}
            />
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Server Seed"}</ModalLabel>
          <ModalField justify="space-between">
            <Span
              weight="medium"
              textOverflow="ellipsis"
            >
              {result.serverSeed}
            </Span>
            <Vector
              as={SvgCopy}
              color="light-blue"
              size={18}
              hover="highlight"
              onClick={() => handleCopy(result.serverSeed)}
            />
          </ModalField>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
