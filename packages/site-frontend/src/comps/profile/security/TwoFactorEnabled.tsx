import { SvgSecuritySecured } from "#app/svgs/common/SvgSecuritySecured";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";

export const TwoFactorEnabled = ({ handleTwoFactorDisable }: { handleTwoFactorDisable: any }) => {
  return (
    <Div
      width={"full"}
      column
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
          as={SvgSecuritySecured}
          color="sand"
          height={40}
          width={40}
        />
      </Div>

      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
      >
        SECURITY (2FA) IS ENABLED
      </Span>
      <Span
        color="dark-sand"
        mt={32}
      >
        You have your security (2FA) enabled via{" "}
        <Span
          textDecoration="underline"
          color="sand"
        >
          Google Autheticator
        </Span>
        . We do not recommend disabling it , since it can reflect your account security. You can
        always turn it off to remove login with 2FA
      </Span>
      {/* </Div> */}
      <Div mt={32}>
        <Button
          kind="primary"
          label="Disable 2FA"
          labelWeight="medium"
          labelColor="sand"
          labelSize={16}
          onClick={handleTwoFactorDisable}
        />
      </Div>
    </Div>
  );
};
