import { FC } from "react";
import { Validation } from "@core/services/validation";
import {
  SiteSettingId,
  SiteSettingValue,
} from "@core/types/site/SiteSettingDocument";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Button } from "@client/comps/button/Button";
import { useForm } from "@client/comps/form/useForm";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Site } from "#app/services/site";

export interface EditOptions {
  id: SiteSettingId;
  value: SiteSettingValue;
  label: string;
  inputType: EditInputType;
}

export type EditInputType =
  | "text"
  | "textarea"
  | "integer"
  | "decimal"
  | "decimal-4"
  | "date"
  | "toggle";

export type SettingEditModalProps = EditOptions & {
  onSuccess: () => void;
};

export const SettingEditModal: FC<SettingEditModalProps> = ({
  id,
  value: initialValue,
  label,
  inputType,
  onSuccess,
}) => {
  const form = useForm({
    schema: Validation.object({
      value:
        Validation.mixed<SiteSettingValue>().required("Value is required."),
    }),
    initialValues: {
      value: initialValue,
    },
    onSubmit: async ({ value }) => {
      await Site.editSetting({ settingId: id, settingValue: value });
      onSuccess();
      Toasts.success("Setting updated.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      className="SettingEditModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={label}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Value"}</ModalLabel>
            {(() => {
              switch (inputType) {
                case "text":
                  return (
                    <Input
                      type="text"
                      placeholder="Enter value..."
                      disabled={form.loading}
                      value={form.values.value as string}
                      error={form.errors.value}
                      onChange={(x) => form.setValue("value", x || "")}
                    />
                  );
                case "textarea":
                  return (
                    <Input
                      type="text"
                      placeholder="Enter value..."
                      disabled={form.loading}
                      value={form.values.value as string}
                      error={form.errors.value}
                      onChange={(x) => form.setValue("value", x || "")}
                    />
                  );
                case "integer":
                  return (
                    <Input
                      type="integer"
                      placeholder="Enter value..."
                      disabled={form.loading}
                      value={form.values.value as number}
                      error={form.errors.value}
                      onChange={(x) => form.setValue("value", x)}
                    />
                  );
                case "decimal":
                  return (
                    <Input
                      type="decimal"
                      decimals={2}
                      placeholder="Enter value..."
                      disabled={form.loading}
                      value={form.values.value as number}
                      error={form.errors.value}
                      onChange={(x) => form.setValue("value", x)}
                    />
                  );
                case "decimal-4":
                  return (
                    <Input
                      type="decimal"
                      decimals={4}
                      placeholder="Enter value..."
                      disabled={form.loading}
                      value={form.values.value as number}
                      error={form.errors.value}
                      onChange={(x) => form.setValue("value", x)}
                    />
                  );
                case "toggle":
                  return (
                    <Checkbox
                      label="Enabled"
                      disabled={form.loading}
                      value={form.values.value as boolean}
                      onChange={(x) => form.setValue("value", x)}
                    />
                  );
              }
            })()}
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Update"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
