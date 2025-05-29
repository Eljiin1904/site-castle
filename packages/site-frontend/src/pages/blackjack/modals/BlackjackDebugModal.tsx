import postMockCards from "#app/services/blackjack/api/postMockCards";
import { Button } from "#client/comps/button/Button";
import { Div } from "#client/comps/div/Div";
import { TextInput } from "#client/comps/input/TextInput";
import { UnorderedList } from "#client/comps/list/UnorderedList";
import { Modal } from "#client/comps/modal/Modal";
import { ModalBody } from "#client/comps/modal/ModalBody";
import { ModalHeader } from "#client/comps/modal/ModalHeader";
import { Dialogs } from "#client/services/dialogs";
import { Toasts } from "#client/services/toasts";
import { useCallback, useState } from "react";

export const BlackjackDebugModal = () => {
  const [val, setVal] = useState("");

  const onSubmit = useCallback(
    () => {
      const split = val.split(",").map((s) => s.trim());
      if (!split.length) return void Toasts.error("No cards entered");
      postMockCards({ cardAbbrevAr: split }).then(() => {
        Toasts.info("Mock cards set");
        Dialogs.close("primary");
      });
    },
    [val], // this is likely pointless
  );

  const onChange = useCallback(
    (inputVal: string | undefined) => {
      setVal(inputVal || "");
    },
    [setVal],
  );

  return (
    <Modal
      width="lg"
      disableMobileFullscreen
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Blackjack Debugger - Mock Cards"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Div>
          Used to stack the deck with specific cards only for your player. Cards are defined as "AS"
          for Ace of Spades. Separated by commas, spaces trimmed. If mock cards run out the game
          will switch back to nonce rolled cards.
        </Div>
        <UnorderedList
          fx
          itemSize={14}
          items={[
            `card #1: Player's first card`,
            `card #2: Dealer's first card`,
            `card #3: Player's second card`,
            `card #4: Dealer's second card (hidden)`,
            `cards #5-n: Additional cards go to player, unless stand or player/dealer blackjack`,
            `cards #n+: Remaining cards go to dealer`,
          ]}
        />

        <TextInput
          placeholder="AS, 2H, 3D, 10C"
          type="text"
          value={val}
          onChange={onChange}
        />

        <Button
          kind="primary"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </ModalBody>
    </Modal>
  );
};
