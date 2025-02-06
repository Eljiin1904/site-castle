import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";

export const LoginBanner = () => {
  return (
    <Div
      className="login-banner"
      bg="brown-8"
    >
      <Img
        type="jpg"
        path="/graphics/login-banner"
        width="369px"
        height="728px"
        position="absolute"
        left={0}
        top={0}
      />
    </Div>
  );
};
