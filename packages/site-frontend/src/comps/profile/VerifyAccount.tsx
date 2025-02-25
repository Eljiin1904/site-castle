import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { VerificationStepper } from "./VerificationStepper";

export const VerifyAccount = () => {
  // const statusInformation = verificationStatusDetails(status);
  return (
    <Div
      column
      width={"full"}
    >
      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
      >
        VERIFY YOUR ACCOUNT ( KYC )
      </Span>
      <Div mt={20}>
        <VerificationStepper />
      </Div>
    </Div>
  );
};
