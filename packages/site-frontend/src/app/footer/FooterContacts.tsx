import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const FooterContacts = () => {
  const {t} = useTranslation();
  const small = useIsMobileLayout();
  return (<Div gap={20} {...(small ? {flexFlow: "column"} : {})}>
      <Div gap={2}>
        <Span
          size={12}
          color="dark-sand"
          lineHeight={20}
          weight="medium"
        >
          {t("footer.support")}
        </Span>
        <Span
          size={12}
          lineHeight={20}
          color="light-sand"
          weight="medium"
        >
          {"support@sandcasino.com"}
        </Span>
      </Div>
      <Div gap={2}>
        <Span
          size={12}
          lineHeight={20}
          color="dark-sand"
          weight="medium"
        >
          {t("footer.partners")}
        </Span>
        <Span
          size={12}
          lineHeight={20}
          color="light-sand"
          weight="medium"
        >
          {"partners@sandcasino.com"}
        </Span>
      </Div>
      <Div gap={2}>
        <Span
          size={12}
          lineHeight={20}
          color="dark-sand"
          weight="medium"
        >
           {t("footer.press")}
        </Span>
        <Span
          size={12}
          lineHeight={20}
          color="light-sand"
          weight="medium"
        >
          {"press@sandcasino.com"}
        </Span>
      </Div>
    </Div>);
};
