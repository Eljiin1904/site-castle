import { useQueryClient } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Modal } from "@client/comps/modal/Modal";
import { useForm } from "@client/comps/form/useForm";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Button } from "@client/comps/button/Button";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { UserDocument } from "@core/types/users/UserDocument";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserTipLimitModal = ({ user }: { user: UserDocument }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      tipLimit: Validation.currency("Tip limit").optional(),
    }),
    initialValues: {
      tipLimit: user.meta.tipLimit,
    },
    onSubmit: async ({ tipLimit }) => {
      await Users.setTipLimit({
        userId: user._id,
        tipLimit,
      });

      Toasts.success("Tip limit updated.");
      Dialogs.close("primary");

      queryClient.invalidateQueries({ queryKey: ["user", user._id] });
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Set Tip Limit"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Daily Limit"}</ModalLabel>
            <Input
              type="currency"
              placeholder="Enter token amount..."
              disabled={form.loading}
              error={
                form.errors.tipLimit?.key
                  ? t(form.errors.tipLimit.key, { value: form.errors.tipLimit.value })
                  : undefined
              }
              value={form.values.tipLimit}
              onChange={(x) => form.setValue("tipLimit", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Update Limit"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
