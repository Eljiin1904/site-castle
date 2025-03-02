import { Users } from "#app/services/users";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Form } from "@client/comps/form/Form";
import { FormLabel } from "@client/comps/form/FormLabel";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Utility } from "@client/services/utility";
import { Validation } from "@core/services/validation";

export const PersonalInfo = ({ layout }: { layout: string }) => {
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
      city: Validation.string().max(32, "Max characters is 32").required("City is required."),
      state: Validation.string().max(32, "Max characters is 32").required("State is required."),

      zipCode: Validation.string()
        .max(16, "Max characters is 16")
        .required("Zip code is required."),
      countryIndex: Validation.integer("Country"),
      occupation: Validation.string()
        .max(32, "Max characters is 32")
        .required("Occupation is required."),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier1(values);
    },
  });
  return (
    <Div
      column
      width={"full"}
    >
      <Form
        grow
        form={form}
      >
        <Div
          column
          width={"full"}
        >
          {/* Name  */}
          <Div
            width={"full"}
            gap={12}
            mb={20}
          >
            <Div
              column
              width={"full"}
            >
              <FormLabel color="dark-sand">{"First Name"}</FormLabel>
              <Input
                type="text"
                placeholder="Enter first name..."
                disabled={form.loading}
                error={form.errors.firstName}
                value={form.values.firstName}
                onChange={(x) => form.setValue("firstName", x)}
              />
            </Div>
            <Div
              column
              width={"full"}
            >
              <FormLabel color="dark-sand">{"Last Name"}</FormLabel>
              <Input
                type="text"
                placeholder="Enter last name..."
                disabled={form.loading}
                error={form.errors.lastName}
                value={form.values.lastName}
                onChange={(x) => form.setValue("lastName", x)}
              />
            </Div>
          </Div>

          {/*  Date of Birth */}
          <FormLabel color="dark-sand">{"Date of birth"}</FormLabel>
          <Div
            gap={12}
            mb={20}
            fx
            width={"full"}
            align="center"
            justify="center"
          >
            <Input
              type="dob"
              error={form.errors.dob}
              value={form.values.dob}
              onChange={(x) => form.setValue("dob", x)}
              width={"full"}
            />
          </Div>

          {/* Address */}
          <Div
            width={"full"}
            gap={12}
            mb={20}
          >
            <Div
              column
              width={"full"}
            >
              <FormLabel color="dark-sand">{"Resident Address"}</FormLabel>
              <Input
                type="text"
                placeholder="Resident address..."
                disabled={form.loading}
                error={form.errors.address}
                value={form.values.address}
                onChange={(x) => form.setValue("address", x)}
              />
            </Div>
          </Div>

          <Div
            gap={small ? 24 : 16}
            mb={20}
            flexFlow={small ? "row-wrap" : undefined}
          >
            <Div
              width={"full"}
              column
            >
              <FormLabel color="dark-sand">{"City / Town"}</FormLabel>
              <Input
                type="text"
                placeholder="Enter city..."
                disabled={form.loading}
                error={form.errors.city}
                value={form.values.city}
                onChange={(x) => form.setValue("city", x)}
              />
            </Div>
            <Div
              width={"full"}
              column
            >
              <FormLabel color="dark-sand">{"State"}</FormLabel>
              <Input
                type="text"
                placeholder="Enter state..."
                disabled={form.loading}
                error={form.errors.state}
                value={form.values.state}
                onChange={(x) => form.setValue("state", x)}
              />
            </Div>
          </Div>

          <Div
            gap={12}
            flexFlow={small ? "row-wrap" : undefined}
          >
            <Div
              width={"full"}
              column
            >
              <FormLabel color="dark-sand">{"Country"}</FormLabel>
              <Dropdown
                forceDirection="top"
                type="select"
                placeholder="Select a country..."
                buttonKind="secondary"
                options={Utility.supportedCountries.map((x) => x.name)}
                disabled={form.loading}
                error={form.errors.countryIndex}
                value={form.values.countryIndex}
                onChange={(x, i) => form.setValue("countryIndex", i)}
              />
            </Div>
            <Div
              width={"full"}
              column
            >
              <FormLabel color="dark-sand">{"Postal / Zip Code"}</FormLabel>
              <Input
                type="text"
                placeholder="Enter zip code..."
                disabled={form.loading}
                error={form.errors.zipCode}
                value={form.values.zipCode}
                onChange={(x) => form.setValue("zipCode", x)}
              />
            </Div>
          </Div>
        </Div>
        <Div
          column
          width={"full"}
        >
          <FormLabel color="dark-sand">{"Occupation"}</FormLabel>
          <Input
            type="text"
            placeholder="Enter occupation..."
            disabled={form.loading}
            error={form.errors.occupation}
            value={form.values.occupation}
            onChange={(x) => form.setValue("occupation", x)}
          />
        </Div>
        <Div mt={10}>
          <Button
            type="submit"
            kind="primary-yellow"
            label="Submit"
            size="md"
            loading={form.loading}
          />
        </Div>
      </Form>
    </Div>
  );
};
