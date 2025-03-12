import { FC } from "react";
import { Button } from "#client/comps/button/Button";
import { Div } from "#client/comps/div/Div";
import { Modal } from "#client/comps/modal/Modal";
import { ModalBody } from "#client/comps/modal/ModalBody";
import { ModalHeader } from "#client/comps/modal/ModalHeader";
import { Dialogs } from "#client/services/dialogs";

export type NoticeModalProps = {
  heading: string;
  message: string | JSX.Element;
};

export function showNotice(options: NoticeModalProps) {
  Dialogs.open("secondary", <NoticeModal {...options} />);
}

export const NoticeModal: FC<NoticeModalProps> = ({ heading, message }) => {
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("secondary")}
    >
      <ModalHeader
        heading={heading}
        onCloseClick={() => Dialogs.close("secondary")}
      />
      <ModalBody>
        <Div
          fx
          fontSize={14}
          fontWeight="semi-bold"
          color="gray"
        >
          {message}
        </Div>
        <Div
          fx
          gap={16}
        >
          <Button
            fx
            kind="secondary"
            label="Okay"
            onClick={() => Dialogs.close("secondary")}
          />
        </Div>
      </ModalBody>
    </Modal>
  );
};
