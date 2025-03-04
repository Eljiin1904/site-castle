import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";

export const VerificationOnePartThreeForm = ({ disableClose }: { disableClose?: boolean }) => {
  const form = useForm({
    schema: Validation.object({
      occupation: Validation.string()
        .max(32, "Max characters is 32")
        .required("Occupation is required."),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier1Part3(values);

      Toasts.success("Account setup complete.");

      if (!disableClose) {
        Dialogs.close("primary");
      }
    },
  });

  return (
    <Form
      grow
      form={form}
    >
      <Div
        fx
        column
        grow
        gap={24}
      >
        <ModalSection>
          <ModalLabel>{"Occupation"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter occupation..."
            disabled={form.loading}
            error={form.errors.occupation}
            value={form.values.occupation}
            onChange={(x) => form.setValue("occupation", x)}
          />
        </ModalSection>
      </Div>
      <Div
        fx
        justify="flex-end"
      >
        <Button
          fx
          type="submit"
          kind="primary"
          label="Start Playing!"
          loading={form.loading}
        />
      </Div>
    </Form>
  );
};
