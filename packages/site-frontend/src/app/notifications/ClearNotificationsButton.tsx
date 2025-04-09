import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Button } from "@client/comps/button/Button";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ClearNotificationsButton = () => {

  const small = useIsMobileLayout();
  const { t } = useTranslation(["common"]);

  return (<Button
      kind={small ? "tertiary-grey": "secondary-grey"}      
      label={t("clear")}
      fx={small}
      onClick={() => {}}
    />);
};