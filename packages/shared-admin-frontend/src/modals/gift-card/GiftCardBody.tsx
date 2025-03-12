import { Fragment } from "react";
import { GiftCardDocument } from "@core/types/economy/GiftCardDocument";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Div } from "@client/comps/div/Div";
import { Dates } from "@core/services/dates";
import { Economy } from "#app/services/economy";
import { Users } from "#app/services/users";

export const GiftCardBody = ({ card }: { card: GiftCardDocument }) => {
  return (
    <Fragment>
      <ModalSection>
        <ModalLabel>{"Batch"}</ModalLabel>
        <ModalField>{card.batchId}</ModalField>
      </ModalSection>

      <Div
        fx
        gap={16}
      >
        <ModalSection>
          <ModalLabel>{"Tag"}</ModalLabel>
          <ModalField>{Economy.getGiftTagName(card.tag)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Status"}</ModalLabel>
          <ModalField color={card.used ? "green" : "orange"}>
            {card.used ? "Used" : "Unused"}
          </ModalField>
        </ModalSection>
      </Div>
      <ModalSection>
        <ModalLabel>{"Token Amount"}</ModalLabel>
        <ModalField>
          <Tokens value={card.tokenAmount} />
        </ModalField>
      </ModalSection>
      {card.used && (
        <Fragment>
          <Div
            fx
            gap={16}
          >
            <ModalSection>
              <ModalLabel>{"User"}</ModalLabel>
              <ModalField>{card.user.name}</ModalField>
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"Redeemed"}</ModalLabel>
              <ModalField>{Dates.toFullDateString(card.useDate)}</ModalField>
            </ModalSection>
          </Div>
          <ModalSection>
            <ModalLabel>{"Location"}</ModalLabel>
            <ModalField>{Users.getLocationString(card.useLocation)}</ModalField>
          </ModalSection>
        </Fragment>
      )}
    </Fragment>
  );
};
