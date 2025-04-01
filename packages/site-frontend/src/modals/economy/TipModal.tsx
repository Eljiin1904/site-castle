import { useState } from "react";
import { Validation } from "@core/services/validation";
import { Form } from "@client/comps/form/Form";
import { Button } from "@client/comps/button/Button";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "../login/LoginModal";
import { UserEmailConfirmModal } from "../user/UserEmailConfirmModal";
import { useSendTip } from "./tip/useSendTip";
import { LimitSection } from "./tip/LimitSection";
import { VerificationModal } from "../verification/VerificationModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const TipModal = ({ sendTo }: { sendTo?: string }) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const {t} = useTranslation();
  const handleTip = useSendTip();

  const form = useForm({
    schema: Validation.object({
      lookup: Validation.string().required("validations:validations.tip.recipientRequired"),
      tipAmount: Validation.currency(t("fields:tip.amount"), tokenBalance),
    }),
    initialValues: {
      lookup: sendTo,
    },
    onSubmit: handleTip,
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
        heading={t("chat.tipModal.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <LimitSection />
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{t("fields:tip.sendTo")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:tip.tipPlaceholder")}
              disabled={form.loading}
              error={form.errors.lookup?.key ? t(form.errors.lookup.key, {value: form.errors.lookup.value}) : undefined}
              value={form.values.lookup}
              onChange={(x) => form.setValue("lookup", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:tip.amount")}</ModalLabel>
            <Input
              type="currency"
              placeholder={t("fields:tip.amountPlaceholder")}
              disabled={form.loading}
              error={form.errors.tipAmount?.key ? t(form.errors.tipAmount.key, {value: form.errors.tipAmount.value}) : undefined}
              value={form.values.tipAmount}
              onChange={(x) => form.setValue("tipAmount", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("chat.tipModal.submit")}
            fx
            loading={form.loading}
            mt={4}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
