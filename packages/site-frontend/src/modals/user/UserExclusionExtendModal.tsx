import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Toasts } from "@client/services/toasts";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Users } from "#app/services/users";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "../login/LoginModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserExclusionExtendModal = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  
  const form = useForm({
    schema: Validation.object({
      timeIndex: Validation.integer("Duration").min(0).max(4),
      confirmed: Validation.boolean().oneOf([true],t("validations:validations.selfExclusion.required")),
    }),
    initialValues: {
      timeIndex: 0,
      confirmed: false,
    },
    onSubmit: async (values) => {
      await Users.extendExclusion(values);
      dispatch(Users.resetUser());
      Toasts.success("selfExclusion.extension.modal.success", 8000);
      Dialogs.close("primary");
    },
  });

  if (!authenticated) {
    return <LoginModal />;
  }
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("selfExclusion.extension.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody pt={0}>
        <Form form={form} pt={24} borderTop borderColor="brown-4">
          <ModalSection>
            <Paragraph>{t("selfExclusion.extension.modal.longerBreak")}</Paragraph>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:selfExclusion.duration.field")}</ModalLabel>
            <Dropdown
              type="select"
              fx
              options={[
                t("fields:selfExclusion.duration.options.1d"), 
                t("fields:selfExclusion.duration.options.1w"), 
                t("fields:selfExclusion.duration.options.1m"), 
                t("fields:selfExclusion.duration.options.3m"), 
                t("fields:selfExclusion.duration.options.indefinite"), 
                ]}
              disabled={form.loading}
              value={form.values.timeIndex || 0}
              onChange={(x, i) => form.setValue("timeIndex", i)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:selfExclusion.siteBalance.field")}</ModalLabel>
            <Paragraph mb={12}>{t("selfExclusion.extension.modal.withdrawBalance")}</Paragraph>
            <Checkbox
              bg
              label={t("selfExclusion.extension.modal.withdrawBalanceConfirmation")}
              disabled={form.loading}
              error={form.errors.confirmed?.key ? t(form.errors.confirmed.key, {value: form.errors.confirmed.value}) : undefined}
              value={form.values.confirmed}
              onChange={(x) => form.setValue("confirmed", x)}
            />
          </ModalSection>
          <Div
            fx
            column
            gap={12}
          >
            <NoticeCard
              kind="warning"
              message={t("selfExclusion.extension.modal.supportNotice")}
            />
            <NoticeCard
              kind="info"
              message={t("selfExclusion.extension.modal.logoutNotice")}
            />
          </Div>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("selfExclusion.extension.title")}
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
