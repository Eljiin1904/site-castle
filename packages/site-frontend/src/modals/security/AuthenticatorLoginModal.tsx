import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { AuthenticatorCodeForm } from "./AuthenticatorCodeForm";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AuthenticatorLoginModal = ({
  userId,
  loginToken,
}: {
  userId: string;
  loginToken: string;
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation([]);

  return (
    <Modal
      className="AuthenticatorLoginModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("login2fa")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <AuthenticatorCodeForm
          userId={userId}
          onSubmit={async (values) => {
            const res = await Security.authenticatorLogin({
              ...values,
              loginToken,
            });
            dispatch(Users.initUser({ authenticated: true, user: res.user }));
            Toasts.success("register.success", 5000, { username: res.user.username });
            Dialogs.close("primary");
          }}
        />
      </ModalBody>
    </Modal>
  );
};
