import { CaseBattleResult } from "@core/types/case-battles/CaseBattleResult";
import { Dates } from "@core/services/dates";
import { Strings } from "@core/services/strings";
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
import { Link } from "@client/comps/link/Link";
import { Button } from "@client/comps/button/Button";
import { CaseBattles } from "#app/services/case-battles";
import config from "#app/config";

export const FairnessCaseBattleModal = ({
  result,
}: {
  result: CaseBattleResult;
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
        heading="Case Battle Result"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Link
          fx
          type="a"
          href={`${config.siteURL}/case-battles/${result.gameId}`}
          hover="none"
        >
          <Button
            fx
            kind="secondary"
            label="View Battle"
          />
        </Link>
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
          <ModalLabel>{"Battle"}</ModalLabel>
          <ModalField>
            {`${CaseBattles.getModeCategory(result.mode)} - ${Strings.kebabToTitle(result.mode)}`}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Modifiers"}</ModalLabel>
          <ModalField>
            {result.modifiers.map((x) => Strings.kebabToTitle(x)).join(", ") ||
              "--"}
          </ModalField>
        </ModalSection>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Winners"}</ModalLabel>
            <ModalField>
              {result.winners.map((x) => `P${x + 1}`).join(",")}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Pot"}</ModalLabel>
            <ModalField>
              <Tokens value={result.totalWon} />
            </ModalField>
          </ModalSection>
        </Div>
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
      </ModalBody>
    </Modal>
  );
};
