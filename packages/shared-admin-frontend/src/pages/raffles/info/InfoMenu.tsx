import { RaffleDocument } from "@core/types/rewards/RaffleDocument";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const InfoMenu = ({ raffle }: { raffle: RaffleDocument }) => {
  return (
    <Div
      border
      bg="brown-6"
      style={{ minWidth: "350px", minHeight: "770px" }}
    >
      <ModalBody>
        <ModalSection>
          <ModalLabel>{"Raffle ID"}</ModalLabel>
          <ModalCopyField text={raffle._id} />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Display name"}</ModalLabel>
          <ModalCopyField text={raffle.displayName} />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Start Date"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(raffle.startDate)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"End Date"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(raffle.endDate)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Raffle Value"}</ModalLabel>
          <ModalField>
            <Tokens value={raffle.totalValue} />
          </ModalField>
        </ModalSection>
      </ModalBody>
    </Div>
  );
};
