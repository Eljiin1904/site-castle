import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { Div } from "@client/comps/div/Div";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { useMount } from "@client/hooks/system/useMount";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Users } from "#app/services/users";
import { UserEmailEditModal } from "./UserEmailEditModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserEmailConfirmModal = ({
  confirmToken: initToken,
}: {
  confirmToken?: string;
}) => {
  useMount(async () => {
    await Users.sendEmailLink();
  });

  const {t} = useTranslation(["validations"]);
  const form = useForm({
    schema: Validation.object({
      confirmToken: Validation.string().required("validations.code.required"),
    }),
    initialValues: {
      confirmToken: initToken,
    },
    onSubmit: async (values) => {
      await Users.confirmEmail(values);
      Toasts.success("register.emailConfirmed");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("register.confirm.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <NoticeCard
              kind="success"
              message={t("register.confirm.codeSent")}
            />
          </ModalSection>
          <ModalSection>
            
            <ModalLabel>{t("fields:code.field")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:code.codePlaceholder")}
              disabled={form.loading}
              error={
                form.errors.confirmToken?.key
                  ? t(form.errors.confirmToken.key, { value: form.errors.confirmToken.value })
                  : undefined
              }
              value={form.values.confirmToken}
              onChange={(x) =>
                form.setValue(
                  "confirmToken",
                  x?.replace(/[^a-z0-9]/gi, "").toUpperCase(),
                )
              }
            />
          </ModalSection>
          <Div
            fx
            column
            gap={12}
          >
            <Button
              type="submit"
              kind="primary-yellow"
              label={t("common:submit")}
              fx
              loading={form.loading}
            />
            <Button
              kind="tertiary-grey"
              label={t("register.changeEmail")}
              fx
              loading={form.loading}
              onClick={() => Dialogs.open("primary", <UserEmailEditModal />)}
            />
            
          </Div>
        </Form>
      </ModalBody>
    </Modal>
  );
};
