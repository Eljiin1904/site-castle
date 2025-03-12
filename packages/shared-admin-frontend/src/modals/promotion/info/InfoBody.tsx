import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { Users } from "@core/services/users";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Economy } from "#app/services/economy";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { Intimal } from "@core/services/intimal";

export const InfoBody = ({
  promotion,
}: {
  promotion: PromotionCodeDocument;
}) => {
  const status = Economy.getPromoStatusInfo(promotion);

  return (
    <ModalBody overflow="auto">
      <ModalSection>
        <ModalLabel>{"Promotion ID"}</ModalLabel>
        <ModalField>{promotion._id}</ModalField>
      </ModalSection>
      <Div
        fx
        gap={12}
      >
        <ModalSection>
          <ModalLabel>{"Start Date"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(promotion.startDate)}</ModalField>
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"End Date"}</ModalLabel>
          <ModalField>{Dates.toTimestamp(promotion.endDate)}</ModalField>
        </ModalSection>
      </Div>
      <ModalSection>
        <ModalLabel>{"Token Amount"}</ModalLabel>
        <ModalField>
          <Tokens value={promotion.tokenAmount} />
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Level Requirement"}</ModalLabel>
        {promotion.requiredXP ? (
          <ModalField>{Users.getLevel(promotion.requiredXP)}</ModalField>
        ) : (
          <ModalField color="dark-gray">{"No level requirement"}</ModalField>
        )}
      </ModalSection>
      <Div
        fx
        gap={12}
      >
        <ModalSection>
          <ModalLabel>{"Wager Requirement"}</ModalLabel>
          {promotion.requiredWagerAmount ? (
            <ModalField>
              {Intimal.toLocaleString(promotion.requiredWagerAmount, 0)}
              {` tokens in the last ${promotion.requiredWagerDays} days`}
            </ModalField>
          ) : (
            <ModalField color="dark-gray">{"No wager requirement"}</ModalField>
          )}
        </ModalSection>
      </Div>
      <ModalSection>
        <ModalLabel>{"Used"}</ModalLabel>
        <ModalField>{`${promotion.uses}/${promotion.maxUses}`}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Status"}</ModalLabel>
        <ModalField color={status.color}>{status.label}</ModalField>
      </ModalSection>
    </ModalBody>
  );
};
