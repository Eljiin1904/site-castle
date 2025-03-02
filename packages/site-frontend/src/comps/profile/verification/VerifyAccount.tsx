import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { VerificationStepper } from "./VerificationStepper";

export const VerifyAccount = () => {
  return (
    <Div
      column
      width={"full"}
    >
      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
        mb={20}
      >
        VERIFY YOUR ACCOUNT
      </Span>
      <Div mt={20}>
        <VerificationStepper whole={true} />
      </Div>
    </Div>
  );
};
