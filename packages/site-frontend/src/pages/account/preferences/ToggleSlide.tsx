import { useState } from "react";
import { UserSettingKey } from "@core/types/users/UserSettings";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Toasts } from "@client/services/toasts";
import { Toggle } from "@client/comps/toggle/Toggle";
import { CardSection } from "@client/comps/cards/CardSection";
import { usePost } from "@client/hooks/system/usePost";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import { waitForAuthenticatorCode } from "#app/modals/security/AuthenticatorCodeModal";
import { Security } from "#app/services/security";
import { Heading } from "@client/comps/heading/Heading";
import { useTranslation } from "@core/services/internationalization/internationalization";
import './ToggleSlide.scss';

export const ToggleSlide = ({
  id,
  heading,
  description,
  disabled,
  borderBottom = true,
}: {
  id: UserSettingKey;
  heading: string;
  description: string;
  disabled?: boolean;
  borderBottom?: boolean;
}) => {
  const settings = useAppSelector((x) => x.user.settings);
  const [loading, setLoading] = useState(false);
  const isOn = settings[id];
  const requires2fa = Users.setting2faKeys.includes(id);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  const {t} = useTranslation(["account"]);

  const handleToggle = usePost(async () => {
    const value = !isOn;

    if (requires2fa) {
      const tfac = await waitForAuthenticatorCode();
      if (!tfac) return;
      await Security.toggleSetting({ id, value, tfac });
    } else {
      await Users.toggleSetting({ id, value });
    }
    const action = t(`common:${value ? "enabled" : "disabled"}`)
    Toasts.success(t(`preferences.${id}.success`, {action: action} ));
  }, setLoading);

  return (
    <CardSection  px={small ? 20 : 24} py={0} position="none">
      <Div fx py={16} borderBottom={borderBottom} borderColor="brown-4" justify="space-between" center>
      <Div column gap={8} className="toggle-slide">
        <Heading as="h3" fontWeight="regular" textTransform="uppercase">
          {heading}
        </Heading>
        {description && <Span
          className="description-text">
          {description}
      </Span>}
      </Div>
      <Toggle
        value={isOn}
        disabled={loading || disabled}
        onChange={handleToggle}
        {...(disabled
          ? {
              "data-tooltip-id": "app-tooltip",
              "data-tooltip-content": t("preferences.authenticatorMustBeEnabled"),
            }
          : undefined)}
      />
      </Div>
    </CardSection>
  );
};
