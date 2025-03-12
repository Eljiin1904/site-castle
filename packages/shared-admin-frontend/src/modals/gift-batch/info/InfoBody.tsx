import { Dates } from "@core/services/dates";
import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalField } from "@client/comps/modal/ModalField";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Economy } from "#app/services/economy";

export const InfoBody = ({ batch }: { batch: GiftBatchDocument }) => {
  return (
    <ModalBody overflow="auto">
      <ModalSection>
        <ModalLabel>{"Batch ID"}</ModalLabel>
        <ModalField>{batch._id}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Tag"}</ModalLabel>
        <ModalField>{Economy.getGiftTagName(batch.tag)}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Token Amount"}</ModalLabel>
        <ModalField>
          <Tokens value={batch.tokenAmount} />
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Used"}</ModalLabel>
        <ModalField>{`${batch.usedCount}/${batch.createdCount}`}</ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Last Used"}</ModalLabel>
        <ModalField>
          {batch.lastUseDate
            ? Dates.toFullDateString(batch.lastUseDate)
            : "Never"}
        </ModalField>
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Created"}</ModalLabel>
        <ModalField>{Dates.toFullDateString(batch.timestamp)}</ModalField>
      </ModalSection>
    </ModalBody>
  );
};
