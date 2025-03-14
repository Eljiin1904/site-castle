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
import './ToggleSlide.scss';

export const ToggleSlide = ({
  id,
  heading,
  description,
  disabled,
}: {
  id: UserSettingKey;
  heading: string;
  description: string;
  disabled?: boolean;
}) => {
  const settings = useAppSelector((x) => x.user.settings);
  const [loading, setLoading] = useState(false);
  const isOn = settings[id];
  const requires2fa = Users.setting2faKeys.includes(id);

  const handleToggle = usePost(async () => {
    const value = !isOn;

    if (requires2fa) {
      const tfac = await waitForAuthenticatorCode();
      if (!tfac) return;
      await Security.toggleSetting({ id, value, tfac });
    } else {
      await Users.toggleSetting({ id, value });
    }

    Toasts.success(`${heading} is now ${value ? "enabled" : "disabled"}.`);
  }, setLoading);

  return (
    <Div
      align="center"
      className="ToggleSlide"
      gap={16}
        
    >
      <Toggle
        value={isOn}
        disabled={loading || disabled}
        onChange={handleToggle}
        {...(disabled
          ? {
              "data-tooltip-id": "app-tooltip",
              "data-tooltip-content": "Authenticator must be enabled",
            }
          : undefined)}
      />
      <Div
        className="label"
      >
        {heading}
      </Div>
      {description && <Span
          className="description-text">
          {description}
      </Span>}
    </Div>
  );
};
