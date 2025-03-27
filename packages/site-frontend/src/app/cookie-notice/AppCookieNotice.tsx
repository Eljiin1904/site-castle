import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Span } from "@client/comps/span/Span";
import "./AppCookieNotice.scss";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AppCookieNotice = () => {
  
  const {t} = useTranslation(["common"]);
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
         {t('cookies')}
        </Span>
        <Div
          className="buttons"
          fx
          center
          mt={16}
          gap={12}
        >
          <Button
            kind="tertiary-grey"
            size="sm"
            label={t('common:accept')}
            fx
            onClick={() => setAccepted(true)}
          />
          <Button
            kind="primary-yellow"
            size="sm"
            label={t('common:moreInfo')}
            fx
            onClick={() => navigate("/about/privacy-policy")}
          />
        </Div>
      </Div>
    </Div>
  );
};
