import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const FooterContacts = () => {
  const {t} = useTranslation();

  return (
    <Fragment>
      <Div gap={4}>
        <Span
          size={13}
          color="brown-10"
        >
          {t("footer.support")}:
        </Span>
        <Span
          size={13}
          color="light-gray"
        >
          {"support@sandcasino.com"}
        </Span>
      </Div>
      <Div gap={4}>
        <Span
          size={13}
          color="brown-10"
        >
          {t("footer.partners")}:
        </Span>
        <Span
          size={13}
          color="light-gray"
        >
          {"partners@sandcasino.com"}
        </Span>
      </Div>
      <Div gap={4}>
        <Span
          size={13}
          color="brown-10"
        >
           {t("footer.press")}:
        </Span>
        <Span
          size={13}
          color="light-gray"
        >
          {"press@sandcasino.com"}
        </Span>
      </Div>
    </Fragment>
  );
};
