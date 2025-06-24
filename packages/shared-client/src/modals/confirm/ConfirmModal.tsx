import { FC, useState } from "react";
import { Button } from "#client/comps/button/Button";
import { Div } from "#client/comps/div/Div";
import { Modal } from "#client/comps/modal/Modal";
import { ModalBody } from "#client/comps/modal/ModalBody";
import { ModalHeader } from "#client/comps/modal/ModalHeader";
import { usePost } from "#client/hooks/system/usePost";
import { Dialogs } from "#client/services/dialogs";
import { Span } from "#client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";

export type ConfirmModalProps = {
  heading: string;
  message: string | JSX.Element;
  disableMobileFullscreen?: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

export async function waitForConfirmation(
  options: Omit<ConfirmModalProps, "onConfirm" | "onCancel">,
) {
  return await new Promise<boolean>((resolve) => {
    Dialogs.open(
      "secondary",
      <ConfirmModal
        {...options}
        onConfirm={() => resolve(true)}
        onCancel={() => resolve(false)}
      />,
    );
  });
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  heading,
  message,
  disableMobileFullscreen = true,
  cancelLabel = "common:cancel",
  confirmLabel = "common:confirm",
  onConfirm,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {t} = useTranslation(["common"]);
  const handleCancel = () => {
    onCancel && onCancel();
    Dialogs.close("secondary");
  };

  const handleConfirm = usePost(async () => {
    await onConfirm();
    Dialogs.close("secondary");
  }, setIsLoading);

  return (
    <Modal
      width="sm"
      disableMobileFullscreen={disableMobileFullscreen}
      onBackdropClick={handleCancel}
    >
      <ModalHeader
        heading={heading}
        onCloseClick={handleCancel}
        noBorder
      />
      <ModalBody pt={0}>
        <Span textAlign="center">
          {message}
        </Span>
        <Div
          fx
          gap={16}
        >
          <Button
            fx
            kind="secondary-yellow"
            label={t(cancelLabel)}
            onClick={handleCancel}
          />
          <Button
            fx
            kind="primary-yellow"
            label={t(confirmLabel)}
            disabled={isLoading}
            onClick={handleConfirm}
          />
        </Div>
      </ModalBody>
    </Modal>
  );
};
