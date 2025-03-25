import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserUnlinkAccountModal = ({ provider }: { provider: UserLinkProvider }) => {
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      password: Validation.password(),
    }),
    onSubmit: async (values) => {
      await Users.unlinkAccount({ ...values, provider });
      Toasts.success(`${Strings.capitalize(provider)} unlinked.`);
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={`Unlink ${Strings.capitalize(provider)}`}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Password"}</ModalLabel>
            <Input
              type="password"
              id="current-password"
              placeholder="Enter password..."
              autoComplete="current-password"
              disabled={form.loading}
              error={
                form.errors.password?.key
                  ? t(form.errors.password.key, { value: form.errors.password.value })
                  : undefined
              }
              value={form.values.password}
              onChange={(x) => form.setValue("password", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Unlink"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
