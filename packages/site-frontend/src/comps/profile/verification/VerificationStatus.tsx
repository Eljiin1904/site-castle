import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";

import { Span } from "@client/comps/span/Span";

// "pending" | "verified" | "denied" | "fully-verified"}

export const VerificationStatus = ({
  statusInformation,
}: {
  statusInformation: {
    icon: Svg;
    color?: Color;
    label: string;
    description: string;
    name: string;
    size: number;
  };
}) => {
  return (
    <Div
      width={"full"}
      column
      align="center"
      justify="center"
      mt={20}
      mb={20}
    >
      <Div
        bg="black-overlay"
        height={80}
        width={80}
        border={true}
        borderColor="brown-4"
        align="center"
        justifyContent="center"
        mb={32}
      >
        <Vector
          align="center"
          justifyContent="center"
          as={statusInformation?.icon}
          color={statusInformation.color}
          height={40}
          width={40}
        />
      </Div>

      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
      >
        {statusInformation?.label}
      </Span>
      <Span
        color="dark-sand"
        mt={32}
      >
        {statusInformation?.description}
      </Span>
      {/* </Div> */}
      {/* <Div mt={32}>
            <Button
              kind="primary"
              label="Disable 2FA"
              labelWeight="medium"
              labelColor="sand"
              labelSize={16}
              onClick={handleTwoFactorDisable}
            />
          </Div> */}
    </Div>
  );
};
