import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";

export const GiftCardHeader = ({
  isLoading,
  cardId,
  setCardId,
}: {
  isLoading: boolean;
  cardId: string | undefined;
  setCardId: (x: string | undefined) => void;
}) => {
  return (
    <ModalSection>
      <ModalLabel>{"Card ID"}</ModalLabel>
      <Input
        type="text"
        placeholder="Enter card id..."
        value={cardId}
        disabled={isLoading}
        onChange={setCardId}
      />
    </ModalSection>
  );
};
