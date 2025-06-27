import { Dates } from "@core/services/dates";
import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Div } from "@client/comps/div/Div";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";
import { Span } from "@client/comps/span/Span";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Vector } from "@client/comps/vector/Vector";
import { RaceCreateModal } from "./RaceCreateModal";

export const RaceInfoModal = ({ race }: { race: RaceDocument }) => {
  return (
    <Modal onBackdropClick={() => Dialogs.close("primary")}>
      <ModalHeader
        heading="Race Info"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Race Name"}</ModalLabel>
            <ModalCopyField text={race.displayName} />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Race ID"}</ModalLabel>
            <ModalCopyField text={race._id} />
          </ModalSection>
        </Div>
        <Div
          fx
          gap={12}
        >
          <ModalSection>
            <ModalLabel>{"Start Date"}</ModalLabel>
            <ModalField>{Dates.toTimestamp(race.startDate)}</ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"End Date"}</ModalLabel>
            <ModalField>{Dates.toTimestamp(race.endDate)}</ModalField>
          </ModalSection>
        </Div>
        <ModalSection>
          <Div
            fx
            mb={8}
          >
            <Div grow>
              <Div display="block">
                <Span
                  weight="semi-bold"
                  color="light-sand"
                >
                  {"Payouts "}
                </Span>
                <Span>{"["}</Span>
                <Span color="sand">{race.payouts.length}</Span>
                <Span>{"]"}</Span>
              </Div>
              <Tokens
                value={race.totalPayout}
                ml={8}
              />
            </Div>
            <Div
              align="center"
              gap={6}
              hover="highlight"
              onClick={() =>
                Dialogs.open(
                  "primary",
                  <RaceCreateModal payouts={race.payouts} />,
                )
              }
            >
              <Span
                size={13}
                color="sand"
              >
                {"Copy to New"}
              </Span>
              <Vector
                as={SvgCopy}
                size={14}
                color="sand"
              />
            </Div>
          </Div>
          <Div
            column
            py={8}
            gap={6}
            overflow="auto"
            borderTop
            borderBottom
            style={{ maxHeight: "480px" }}
          >
            {race.payouts.map((value, index) => (
              <ModalField key={index}>
                <Tokens value={value} />
                <Div
                  position="absolute"
                  right={10}
                >
                  <Span
                    size={13}
                  >{`#${index + 1}`}</Span>
                </Div>
              </ModalField>
            ))}
          </Div>
        </ModalSection>
      </ModalBody>
    </Modal>
  );
};
