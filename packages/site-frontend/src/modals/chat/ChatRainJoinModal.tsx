import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { useMount } from "@client/hooks/system/useMount";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "../login/LoginModal";
import { UserEmailConfirmModal } from "../user/UserEmailConfirmModal";

export const ChatRainJoinModal = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const rainId = useAppSelector((x) => x.chat.rain?._id || "");

  const form = useCaptchaForm({
    schema: Validation.object({}),
    onSubmit: async (values) => {
      await Chat.joinRain({ ...values, rainId });
      Toasts.success("Rain joined.");
      Dialogs.close("primary");
    },
  });

  useMount(() => form.handleSubmit());

  if (!authenticated) {
    return <LoginModal />;
  }
  if (!emailConfirmed) {
    return <UserEmailConfirmModal />;
  }
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Join Rain"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <CaptchaForm
          form={form}
          height={128}
          center
        >
          <Button
            type="submit"
            kind="primary"
            label="Join Rain"
            fx
            mt={4}
            loading={form.loading}
          />
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
