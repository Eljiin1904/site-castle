import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Divider } from "@client/comps/divider/Divider";
import { Span } from "@client/comps/span/Span";
import { Toggle } from "@client/comps/toggle/Toggle";
import { useState } from "react";
import { profileSettingOptions } from "../useProfileData";
import "./ProfileSetting.scss";
import { usePost } from "@client/hooks/system/usePost";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Toasts } from "@client/services/toasts";
import { Users } from "#app/services/users";

export const ProfileSettings = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    marketing: true,
    general: true,
    transactionsNotification: true,
    smsNotification: false,
  });

  // const settings = useAppSelector((x) => x.user.settings);
  const [loading, setLoading] = useState(false);

  // const handleToggle = (setting: string) => {
  //   setSettings((prevState) => ({
  //     ...prevState,
  //     [setting]: !prevState[setting],
  //   }));
  // };

  const handleToggle = (option: {
    id: string;
    label: string;
    message: string;
    name: string;
    action: string;
    buttonDetails?: string;
  }) =>
    usePost(async () => {
      // const value = !isOn;
      // if (requires2fa) {
      //   const tfac = await waitForAuthenticatorCode();
      //   if (!tfac) return;
      //   await Security.toggleSetting({ id, value, tfac });
      // } else {
      // if(option){
      // await Users.toggleSetting({ id, value });
      // }
      // setSettings((prevState) => ({
      //   ...prevState,
      //   [setting]: !prevState[setting],
      // }));
      // }
      // Toasts.success(`${heading} is now ${value ? "enabled" : "disabled"}.`);
    }, setLoading);

  const handleButtonAction = (name: string) => {
    if (name == "delete") {
      console.log(name);
    } else if (name == "ban") {
      console.log(name);
    }
  };

  return (
    <Div
      column
      width={"full"}
    >
      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
      >
        Settings
      </Span>
      <Div
        column
        mr={20}
      >
        {profileSettingOptions.map((option, index) => (
          <Div
            column
            gap={20}
            className="container"
            key={index}
          >
            <Span
              color="light-sand"
              textTransform="uppercase"
              fontSize={14}
              mt={20}
            >
              {option.label}
            </Span>
            <Div
              justify="space-between"
              align="center"
              flexFlow="row"
              wrap
              gap={20}
            >
              <Div
                color="dark-sand"
                className="col1"
              >
                {option.message}{" "}
              </Div>
              <Div
                className="col2"
                justify="flex-end"
              >
                {option.action == "toggle" ? (
                  <Toggle
                    value={settings[option.id]}
                    onChange={() => handleToggle(option)}
                  />
                ) : (
                  <Button
                    kind="primary"
                    label={option.buttonDetails || ""}
                    size="lg"
                    onClick={() => handleButtonAction(option.name)}
                  />
                )}
              </Div>
            </Div>
            {index != profileSettingOptions.length - 1 && (
              <Divider
                as={"div"}
                px={16}
                my={5}
                borderColor={"brown-4"}
              />
            )}
          </Div>
        ))}
      </Div>
    </Div>
  );
};
