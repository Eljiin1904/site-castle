import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Divider } from "@client/comps/divider/Divider";
import { Span } from "@client/comps/span/Span";
import { Toggle } from "@client/comps/toggle/Toggle";
import { useState } from "react";
import { profileSettingOptions } from "./useProfileData";
import "./PublicSetting.scss";

export const ProfileSettings = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    marketing: true,
    general: true,
    transactionsNotification: true,
    smsNotification: false,
  });

  const handleToggle = (setting: string) => {
    setSettings((prevState) => ({
      ...prevState,
      [setting]: !prevState[setting],
    }));
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
                    value={settings[option.name]}
                    onChange={() => handleToggle(option.name)}
                  />
                ) : (
                  <Button
                    kind="primary"
                    label={option.buttonDetails || ""}
                    size="lg"
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
