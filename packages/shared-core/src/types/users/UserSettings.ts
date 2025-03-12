import type { settingKeys } from "#core/services/users/Users";

export interface UserSettings {
  largeBetConfirm: boolean;
  unusualBetConfirm: boolean;
  receiveTips: boolean;
  login2fa: boolean;
  bet2fa: boolean;
  withdraw2fa: boolean;
  hiddenMode: boolean;
}

export type UserSettingKey = (typeof settingKeys)[number];
