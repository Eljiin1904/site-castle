import { Span } from "@client/comps/span/Span";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const FooterCopyright = () => {
  const {t} = useTranslation();
  return (
    <Span size={12}>
      {`Copyright © 2025 SandCasino. ${t('footer.copyright')}`}
    </Span>
  );
};
