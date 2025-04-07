import { Validation } from "#core/services/validation";
import { Button } from "#client/comps/button/Button";
import { Form } from "#client/comps/form/Form";
import { useForm } from "#client/comps/form/useForm";
import { Input } from "#client/comps/input/Input";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { Dialogs } from "#client/services/dialogs";
import { Toasts } from "#client/services/toasts";
import { Div } from "#client/comps/div/Div";
import { Dropdown } from "#client/comps/dropdown/Dropdown";
import { Utility } from "#client/services/utility";
import { Users } from "#app/services/users";

export const VerificationTwoWholeForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const small = layout === "mobile";

  const form = useForm({
    schema: Validation.object({
      firstName: Validation.string()
        .max(32, "Max characters is 32")
        .required("First name is required."),
      lastName: Validation.string()
        .max(32, "Max characters is 32")
        .required("Last name is required."),
      dob: Validation.dob(),
      address: Validation.string()
        .max(256, "Max characters is 256")
        .required("Address is required."),
      city: Validation.string()
        .max(32, "Max characters is 32")
        .required("City is required."),
      state: Validation.string()
        .max(32, "Max characters is 32")
        .required("State is required."),
      countryIndex: Validation.integer("Country"),
      zipCode: Validation.string()
        .max(16, "Max characters is 16")
        .required("Zip code is required."),
      occupation: Validation.string()
        .max(32, "Max characters is 32")
        .required("Occupation is required."),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier2(values);

      Toasts.success("Verification submitted.");

      if (!disableClose) {
        Dialogs.close("primary");
      }
    },
  });

  return (
    <Form form={form}>
      <Div
        gap={small ? 24 : 16}
        flexFlow={small ? "row-wrap" : undefined}
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
      </Div>
      <ModalSection>
        <ModalLabel>{"Date of Birth"}</ModalLabel>
        <Input
          type="dob"
          error={form.errors.dob}
          value={form.values.dob}
          onChange={(x) => form.setValue("dob", x)}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Street Address"}</ModalLabel>
        <Input
          type="text"
          placeholder="Enter address..."
          disabled={form.loading}
          error={form.errors.address}
          value={form.values.address}
          onChange={(x) => form.setValue("address", x)}
        />
      </ModalSection>
      <Div
        gap={small ? 24 : 16}
        flexFlow={small ? "row-wrap" : undefined}
      >
        <ModalSection>
          <ModalLabel>{"City / Town"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter city..."
            disabled={form.loading}
            error={form.errors.city}
            value={form.values.city}
            onChange={(x) => form.setValue("city", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"State / Province / Region"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter state..."
            disabled={form.loading}
            error={form.errors.state}
            value={form.values.state}
            onChange={(x) => form.setValue("state", x)}
          />
        </ModalSection>
      </Div>
      <Div
        gap={small ? 24 : 16}
        flexFlow={small ? "row-wrap" : undefined}
      >
        <ModalSection>
          <ModalLabel>{"Country"}</ModalLabel>
          <Dropdown
            forceDirection="top"
            type="select"
            placeholder="Select a country..."
            options={Utility.supportedCountries.map((x) => x.name)}
            disabled={form.loading}
            error={form.errors.countryIndex}
            value={form.values.countryIndex}
            onChange={(x, i) => form.setValue("countryIndex", i)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{"Postal / Zip Code"}</ModalLabel>
          <Input
            type="text"
            placeholder="Enter zip code..."
            disabled={form.loading}
            error={form.errors.zipCode}
            value={form.values.zipCode}
            onChange={(x) => form.setValue("zipCode", x)}
          />
        </ModalSection>
      </Div>
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
      <Div
        fx
        justify="flex-end"
      >
        <Button
          type="submit"
          kind="primary"
          label="Submit"
          width={layout === "mobile" ? "full" : 128}
          loading={form.loading}
        />
      </Div>
    </Form>
  );
};
