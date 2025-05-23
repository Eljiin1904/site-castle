import { Dialogs } from "@client/services/dialogs";
import { ModalKind } from "@client/services/dialogs/Dialogs";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationTwoModal } from "#app/modals/verification/VerificationTwoModal";
import { VerificationThreeModal } from "#app/modals/verification/VerificationThreeModal";

export const tierThreeVerification = ({
  modalKind,
  callback,
  sequential,
}: {
  modalKind: ModalKind;
  callback?: () => void;
  sequential?: boolean;
}) => {
  return Dialogs.open(
    modalKind,
    <VerificationThreeModal
      modalKind={modalKind}
      onCloseClick={() => {
        Dialogs.close(modalKind);
        if (callback) {
          callback();
        }
      }}
      onSubmit={() => {
        Dialogs.close(modalKind);
        if (callback) {
          callback();
        }
      }}
    />,
  );
};

export const tierTwoVerification = ({
  modalKind,
  callback,
  sequential,
}: {
  modalKind: ModalKind;
  callback?: () => void;
  sequential?: boolean;
}) => {
  return Dialogs.open(
    modalKind,
    <VerificationTwoModal
      modalKind={modalKind}
      onCloseClick={() => {
        Dialogs.close(modalKind);
        if (callback) {
          callback();
        }
      }}
      onSubmit={() => {
        if (sequential) {
          return tierThreeVerification({ callback, modalKind, sequential });
        } else {
          Dialogs.close(modalKind);
          if (callback) {
            callback();
          }
        }
      }}
    />,
  );
};

export const tierOneVerification = ({
  modalKind,
  callback,
  sequential,
}: {
  modalKind: ModalKind;
  callback?: () => void;
  sequential?: boolean;
}) => {
  return Dialogs.open(
    modalKind,
    <UserEmailConfirmModal
      modalKind={modalKind}
      onCloseClick={() => {
        Dialogs.close(modalKind);
        if (callback) {
          callback();
        }
      }}
      onSubmit={() => {
        if (sequential) {
          return tierTwoVerification({ modalKind, callback, sequential });
        } else {
          Dialogs.close(modalKind);
          if (callback) {
            callback();
          }
        }
      }}
    />,
  );
};

export const tiers = {
  tierOneVerification,
  tierTwoVerification,
  tierThreeVerification,
};
