import { HolidayEventDocument } from "@core/types/rewards/HolidayEventDocument";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalCopyField } from "@client/comps/modal/ModalCopyField";

export const InfoMenu = ({ holiday }: { holiday: HolidayEventDocument }) => {
  return (
    <Div
      border
      bg="brown-6"
      style={{ minWidth: "350px", minHeight: "800px" }}
    >
      <ModalBody>
        <ModalSection>
          <ModalLabel>{"Holiday ID"}</ModalLabel>
          <ModalCopyField text={holiday._id} />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Display name"}</ModalLabel>
          <ModalCopyField text={holiday.displayName} />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Start Date"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(holiday.startDate)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"End Date"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(holiday.endDate)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Currency Rate"}</ModalLabel>
          <ModalField>
            {`${1 / holiday.currencyRate} XP = 1 Holiday Currency`}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Raffle Rate"}</ModalLabel>
          <ModalField>
            {`${1 / holiday.raffleRate} Currency Spent = 1 Raffle Ticket`}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Boost Rate"}</ModalLabel>
          <ModalField>{`${holiday.boostRate * 100}%`}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Advent Reset Hour"}</ModalLabel>
          <ModalField>
            {holiday.adventResetDate.toLocaleTimeString()}
          </ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Advent Bonus Days"}</ModalLabel>
          <ModalField>{holiday.adventBonusDays.join(", ")}</ModalField>
        </ModalSection>
      </ModalBody>
    </Div>
  );
};
