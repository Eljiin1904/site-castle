import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Span } from "@client/comps/span/Span";
import "./AppCookieNotice.scss";

export const AppCookieNotice = () => {
  const [accepted, setAccepted] = useLocalStorage("accept-cookies", false);
  const navigate = useNavigate();

  if (accepted) {
    return null;
  }
  return (
    <Div
      className="AppCookieNotice"
      position="fixed"
      left={8}
      right={8}
      bottom={8}
      center
    >
      <Div
        className="inner-content"
        column
        center
        p={16}
        bg="brown-6"
      >
        <Span
          textAlign="center"
          color="dark-sand"
        >
          {"This website uses cookies to improve your experience."}
          {" By using this site, you agree to our use of cookies."}
        </Span>
        <Div
          className="buttons"
          fx
          center
          mt={16}
          gap={12}
        >
          <Button
            kind="primary"
            size="sm"
            label="Accept"
            fx
            onClick={() => setAccepted(true)}
          />
          <Button
            kind="secondary"
            size="sm"
            label="More Info"
            fx
            onClick={() => navigate("/about/privacy-policy")}
          />
        </Div>
      </Div>
    </Div>
  );
};
