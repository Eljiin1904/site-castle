import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Span } from "@client/comps/span/Span";
import { Economy } from "#app/services/economy";
import { GiftCardBody } from "./GiftCardBody";
import { GiftCardHeader } from "./GIftCardHeader";

export const GiftCardModal = (props: { cardId?: string }) => {
  const [cardId, setCardId] = useState(props.cardId);

  const query = useQuery({
    queryKey: [cardId],
    queryFn: () => Economy.getGiftCard({ cardId }),
    placeholderData: (prev) => prev,
  });

  const card = query.data?.card;

  let bodyContent;

  if (!card) {
    bodyContent = (
      <Div
        fx
        center
        p={24}
        bg="brown-6"
        border
      >
        <Span weight="medium">{"No card found."}</Span>
      </Div>
    );
  } else {
    bodyContent = <GiftCardBody card={card} />;
  }

  return (
    <Modal
      className="GiftCardModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        onCloseClick={() => Dialogs.close("primary")}
        heading="Lookup Gift Card"
      />
      <ModalBody>
        <GiftCardHeader
          isLoading={query.isLoading}
          cardId={cardId}
          setCardId={setCardId}
        />
        {bodyContent}
      </ModalBody>
    </Modal>
  );
};
