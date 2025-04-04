import { Strings } from "@core/services/strings";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Spinner } from "@client/comps/spinner/Spinner";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { useAuthStatus, useAuthRedirect, useAuthSearch } from "#app/hooks/security/useAuthState";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { AuthenticatorLoginModal } from "./AuthenticatorLoginModal";
import { SocialAuthRegisterModal } from "./SocialAuthRegisterModal";
import { SocialAuthLinkExistingModal } from "./SocialAuthLinkExistingModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const SocialAuthFinalizeModal = ({ provider }: { provider: UserLinkProvider }) => {
  const [, , removeStatus] = useAuthStatus();
  const [, , removeReturnTo] = useAuthRedirect();
  const [search, , removeSearch] = useAuthSearch();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["validations"]);

  useMount(
    async () => {
      removeStatus();
      removeSearch();
      removeReturnTo();

      const res = await Security.authSocial({ provider, search });

      if (res.action === "register") {
        Dialogs.open(
          "primary",
          <SocialAuthRegisterModal
            provider={provider}
            emailRequired={res.emailRequired}
            linkToken={res.linkToken}
          />,
        );
      } else if (res.action === "link") {
        Toasts.success(`${Strings.capitalize(provider)} linked.`);
        Dialogs.close("primary");
      } else if (res.action === "link-to-other-provider") {
        Dialogs.open(
          "primary",
          <SocialAuthLinkExistingModal
            provider={provider}
            userId={res.userId}
            providerId={res.providerId}
          />,
        );
      } else if (res.action === "2fa") {
        Dialogs.open(
          "primary",
          <AuthenticatorLoginModal
            userId={res.userId}
            loginToken={res.loginToken}
          />,
        );
      } else if (res.action === "login") {
        dispatch(Users.initUser({ authenticated: true, user: res.user }));
        Toasts.success("signin.success", 5000, { username: res.user.username });
        Dialogs.close("primary");
      }
    },
    (err) => {
      Toasts.error(err);
      Dialogs.close("primary");
    },
  );

  return (
    <Modal
      className="AuthFinalizeModal"
      width="sm"
      disableBackdrop
    >
      <ModalHeader
        heading={`Logging in with ${Strings.capitalize(provider)}`}
        hideClose
      />
      <ModalBody>
        <Spinner size={64} />
      </ModalBody>
    </Modal>
  );
};
