import { Users } from "#app/services/users";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Validation } from "@core/services/validation";

export const PersonalInfo = () => {
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
      await Users.verifyTier1Part2(values);
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
              <ModalLabel>{"First Name"}</ModalLabel>
              {/* <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Enter First Name"
              /> */}
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
              <ModalLabel>{"Last Name"}</ModalLabel>
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

          <ModalLabel>{"Date of birth"}</ModalLabel>
          <Div
            width={"full"}
            gap={12}
            mb={20}
          >
            <Div
              column
              width={"full"}
            >
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Day"
              />
            </Div>
            <Div
              column
              width={"full"}
            >
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Month"
              />
            </Div>
            <Div
              column
              width={"full"}
            >
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Year"
              />
            </Div>
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
              <ModalLabel>{"Resident Address"}</ModalLabel>
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Resident Address"
              />
            </Div>
          </Div>
          <Div
            width={"full"}
            gap={12}
            mb={20}
          >
            <Div
              column
              width={"full"}
            >
              <ModalLabel>{"City"}</ModalLabel>
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="City"
              />
            </Div>
            <Div
              column
              width={"full"}
            >
              <ModalLabel>{"State"}</ModalLabel>
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="State"
              />
            </Div>
          </Div>
          <Div
            width={"full"}
            gap={12}
            mb={20}
          >
            <Div
              column
              width={"full"}
            >
              <ModalLabel>{"Zip Code"}</ModalLabel>
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Zip Code"
              />
            </Div>
            <Div
              column
              width={"full"}
            >
              <ModalLabel>{"Country"}</ModalLabel>
              <Input
                type="text"
                value={""}
                onChange={() => {}}
                placeholder="Country"
              />
            </Div>
          </Div>
        </Div>
        {/* Occupation */}
        <Div
          column
          width={"full"}
        >
          <ModalLabel>{"Occupation"}</ModalLabel>
          <Input
            type="text"
            value={""}
            onChange={() => {}}
            placeholder="Occupation"
          />
        </Div>
        <Div mt={28}>
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
