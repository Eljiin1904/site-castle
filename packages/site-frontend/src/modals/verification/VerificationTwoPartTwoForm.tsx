import { Validation } from "#core/services/validation";
import { Button } from "#client/comps/button/Button";
import { Form } from "#client/comps/form/Form";
import { useForm } from "#client/comps/form/useForm";
import { Input } from "#client/comps/input/Input";
import { ModalLabel } from "#client/comps/modal/ModalLabel";
import { ModalSection } from "#client/comps/modal/ModalSection";
import { Div } from "#client/comps/div/Div";
import { Dropdown } from "#client/comps/dropdown/Dropdown";
import { Utility } from "#client/services/utility";
import { Users } from "#app/services/users";

export const VerificationTwoPartTwoForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const small = layout === "mobile";

  const form = useForm({
    schema: Validation.object({
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
    }),
    onSubmit: async (values) => {
      await Users.verifyTier2Part2(values);
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
