import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const FooterContacts = () => {
  const {t} = useTranslation();
  const small = useIsMobileLayout();
  return (<Div gap={20} {...(small ? {flexFlow: "column"} : {})}>
      <Div gap={2}>
        <Span size={12}>
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
        <Span size={12}>
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
        <Span size={12}>
           {t("footer.press")}
        </Span>
        <Span size={12}>
          {"press@sandcasino.com"}
        </Span>
      </Div>
    </Div>);
};
