import { SvgCancelCross } from "#app/svgs/common/SvgCancelCross";
import { SvgUpload } from "#app/svgs/common/SvgUpload";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Divider } from "@client/comps/divider/Divider";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";

export const FundsConfirmation = () => {
  const uploadFiles = ["workcontract.png"];

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
        UPLOAD DOCUMENTS TO PROVE YOUR SOURCE OF FUNDS
      </Span>
      <Span
        color="brown-10"
        mt={20}
      >
        Any document providing a proof of source of funds like work contract,loan or any other kind
        of document
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
        {uploadFiles.map((name) => (
          <Div
            key={name}
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
