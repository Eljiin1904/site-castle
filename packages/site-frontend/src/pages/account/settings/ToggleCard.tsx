import { Card } from "@client/comps/cards/Card";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ToggleSlide } from "./ToggleSlide";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ToggleCard = () => {
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const { t } = useTranslation(["account"]);
  return (
    <Card column>
      <ToggleSlide
        id="login2fa"
        heading={t("preferences.login2fa.title")}
        description={t("preferences.login2fa.description")}
        disabled={!tfaEnabled}
      />
      <ToggleSlide
        id="bet2fa"
        heading={t("preferences.bet2fa.title")}
        description={t("preferences.bet2fa.description")}
        disabled={!tfaEnabled}
      />
      <ToggleSlide
        id="withdraw2fa"
        heading={t("preferences.withdraw2fa.title")}
        description={t("preferences.withdraw2fa.description")}
        disabled={!tfaEnabled}
      />
      <ToggleSlide
        id="largeBetConfirm"
        heading={t("preferences.largeBetConfirm.title")}
        description={t("preferences.largeBetConfirm.description")}
      />
      <ToggleSlide
        id="unusualBetConfirm"
        heading={t("preferences.unusualBetConfirm.title")}
        description={t("preferences.unusualBetConfirm.description")}
      />
      <ToggleSlide
        id="receiveTips"
        heading={t("preferences.receiveTips.title")}
        description={t("preferences.receiveTips.description")}
      />
      <ToggleSlide
        id="hiddenMode"
        heading={t("preferences.hiddenMode.title")}
        description={t("preferences.hiddenMode.description")}
        borderBottom={false}
      />
    </Card>
  );
};
