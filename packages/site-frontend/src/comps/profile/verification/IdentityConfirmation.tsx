import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Button } from "@client/comps/button/Button";
import { Vector } from "@client/comps/vector/Vector";
import { SvgUpload } from "#app/svgs/common/SvgUpload";
import { Divider } from "@client/comps/divider/Divider";
import { SvgCancelCross } from "#app/svgs/common/SvgCancelCross";

export const IdentityConfirmation = () => {
  const uploadFiles = ["FrontId.png", "BackID.png"];
  return (
    <Div
      width={"full"}
      column
    >
      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
      >
        Id or Passport Upload
      </Span>
      <Span
        color="brown-10"
        mt={20}
      >
        Please upload your proof of identity. All documents must be laying on a flat surface with
        all 4 corners inside the frame. All information should be clear and identifiable.
      </Span>

      <Span
        color="white"
        mt={20}
      >
        If it’s ID card, please provide front and back files
      </Span>

      <Div
        width={"full"}
        mt={20}
        justify="center"
      >
        <Div
          column
          align="center"
          justify="center"
          border
          borderColor={"brown-4"}
          gap={20}
          width={"full"}
          style={{
            // width: 320,
            height: 180,
          }}
        >
          <Div
            height={40}
            width={40}
          >
            <Vector
              as={SvgUpload}
              color="white"
            />
          </Div>
          <Div mt={10}>
            <Span
              color="brown-10"
              size={12}
            >
              jpeg, pdf or png. Max file size 10mb.
            </Span>
          </Div>
          <Div>
            <Button
              kind="primary"
              labelColor="white"
              label="Upload Photo"
              size="md"
            />
          </Div>
        </Div>
      </Div>
      {/* Show files Uploaded */}

      <Div
        wrap
        gap={20}
        mt={20}
      >
        {uploadFiles.map((name, index) => (
          <Div
            bg="brown-4"
            p={12}
            align="center"
            justify="center"
            flexFlow="row"
          >
            <Div color="white"> {name} </Div>
            <Div pl={20}>
              <Vector as={SvgCancelCross} />
            </Div>
          </Div>
        ))}
      </Div>

      <Divider
        as={"div"}
        px={16}
        mt={28}
        borderColor={"brown-4"}
      />
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
