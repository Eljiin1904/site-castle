import { useState } from "react";
import saveAs from "file-saver";
import { GiftBatchDocument } from "@core/types/economy/GiftBatchDocument";
import { Button } from "@client/comps/button/Button";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { Economy } from "#app/services/economy";

export const ExportBody = ({ batch }: { batch: GiftBatchDocument }) => {
  const [isLoading, setIsLoading] = useState(false);
  const batchId = batch._id;

  const handleExport = usePost(async (isMounted) => {
    const res = await Economy.getGiftBatchExport({ batchId });

    if (!isMounted()) return;

    const blob = new Blob([res.text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${batchId}.txt`);
    Toasts.success("Gift cards exported.");
  }, setIsLoading);

  return (
    <ModalBody>
      <Button
        kind="primary"
        fx
        label="Export Cards"
        disabled={isLoading}
        onClick={handleExport}
      />
    </ModalBody>
  );
};
