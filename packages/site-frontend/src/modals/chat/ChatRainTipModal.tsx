import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Form } from "@client/comps/form/Form";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { useForm } from "@client/comps/form/useForm";
import { Chat } from "#app/services/chat";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "../login/LoginModal";
import { UserEmailConfirmModal } from "../user/UserEmailConfirmModal";
import { VerificationModal } from "../verification/VerificationModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ChatRainTipModal = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const rainId = useAppSelector((x) => x.chat.rain?._id || "");
  const {t} = useTranslation(["validations"]);
  const form = useForm({
    schema: Validation.object({
      tipAmount: Validation.currency(t('fields:tip.amount')).max(
        tokenBalance,
        t("validations:errors.games.notEnoughTokens"),
      ),
    }),
    onSubmit: async (values) => {
      await Chat.tipRain({ ...values, rainId });
      Toasts.success("chat:rainTipModal.confirmSuccess", 5000);
      Dialogs.close("primary");
    },
  });

  if (!authenticated) {
    return <LoginModal />;
  }
  if (!emailConfirmed) {
    return <UserEmailConfirmModal />;
  }
  if (kycTier < 1) {
    return <VerificationModal />;
  }
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('chat:rainTipModal.heading')}
        onCloseClick={() => Dialogs.close("primary")}
        noBorder
      />
      <ModalBody pt={0}>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{t('fields:tip.amount')}</ModalLabel>
            <Input
              type="currency"
              placeholder={t('fields:tip.amountPlaceholder')}
              disabled={form.loading}
              error={form.errors.tipAmount?.key ? t(form.errors.tipAmount.key, {value: form.errors.tipAmount.value}) : undefined}
              value={form.values.tipAmount}
              onChange={(x) => form.setValue("tipAmount", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t('chat:rainTipModal.action')}
            fx
            mt={4}
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
