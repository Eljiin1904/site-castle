import { useState } from "react";
import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";
import { Button } from "@client/comps/button/Button";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { Economy } from "#app/services/economy";

export const CancelBody = ({
  promotion,
  onCancel,
}: {
  promotion: PromotionCodeDocument;
  onCancel: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const promotionId = promotion._id;

  const handleCancel = usePost(async (isMounted) => {
    const confirmed = await waitForConfirmation({
      heading: "Cancel Promotion",
      message: `Are you sure you want to cancel the "${promotionId}" promotion?`,
    });

    if (!confirmed) return;

    await Economy.cancelPromotion({ promotionId });

    if (isMounted()) {
      onCancel();
      Toasts.success("Promotion cancelled.");
      Dialogs.close("primary");
    }
  }, setIsLoading);

  return (
    <ModalBody>
      <Button
        kind="secondary"
        fx
        label="Cancel Promotion"
        disabled={isLoading}
        onClick={handleCancel}
      />
    </ModalBody>
  );
};
