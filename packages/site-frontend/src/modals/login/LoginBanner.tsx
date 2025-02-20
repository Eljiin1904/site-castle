import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { LoginAction } from "./LoginAction";

export const LoginBanner = ({action}: {
  action: LoginAction;
}) => {
  return (
    <Div
      className="login-banner"
      bg="brown-8"
    >
      <Img
        type="jpg"
        path={`/graphics/${action}-banner`}
        width="369px"
        height={action === "login" ? "518px" : "728px"}
        position="absolute"
        left={0}
        top={0}
      />
    </Div>
  );
};
