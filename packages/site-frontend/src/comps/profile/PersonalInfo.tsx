import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalLabel } from "@client/comps/modal/ModalLabel";

export const PersonalInfo = () => {
  return (
    <Div
      column
      width={"full"}
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
            <Input
              type="text"
              value={""}
              onChange={() => {}}
              placeholder="Enter start date..."
            />
          </Div>
          <Div
            column
            width={"full"}
          >
            <ModalLabel>{"Last Name"}</ModalLabel>
            <Input
              type="text"
              value={""}
              onChange={() => {}}
              placeholder="Enter start date..."
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
          placeholder="Enter start date..."
        />
      </Div>
      <Div mt={28}>
        <Button
          kind="primary-yellow"
          label="Submit"
          size="md"
        />
      </Div>
    </Div>
  );
};
