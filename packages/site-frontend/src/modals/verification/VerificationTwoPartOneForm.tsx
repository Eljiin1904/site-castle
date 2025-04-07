import { Validation } from "#core/services/validation";
import { Button } from "#client/comps/button/Button";
import { Form } from "#client/comps/form/Form";
import { useForm } from "#client/comps/form/useForm";
import { Input } from "#client/comps/input/Input";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { Div } from "#client/comps/div/Div";
import { Users } from "#app/services/users";

export const VerificationTwoPartOneForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const form = useForm({
    schema: Validation.object({
      firstName: Validation.string()
        .max(32, "Max characters is 32")
        .required("First name is required."),
      lastName: Validation.string()
        .max(32, "Max characters is 32")
        .required("Last name is required."),
      dob: Validation.dob(),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier2Part1(values);
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
          <ModalLabel>{"First Name"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter first name..."
            disabled={form.loading}
            error={form.errors.firstName}
            value={form.values.firstName}
            onChange={(x) => form.setValue("firstName", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Last Name"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter last name..."
            disabled={form.loading}
            error={form.errors.lastName}
            value={form.values.lastName}
            onChange={(x) => form.setValue("lastName", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Date of Birth"}</ModalLabel>
          <Input
            type="dob"
            error={form.errors.dob}
            value={form.values.dob}
            onChange={(x) => form.setValue("dob", x)}
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
          label="Continue"
          loading={form.loading}
        />
      </Div>
    </Form>
  );
};
