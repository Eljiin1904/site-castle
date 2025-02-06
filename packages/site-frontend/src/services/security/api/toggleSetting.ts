import { UserSettingKey } from "@core/types/users/UserSettings";
import { Http } from "@client/services/http";

export function toggleSetting(data: {
  id: UserSettingKey;
  value: boolean;
  tfac: string;
}): Promise<void> {
  return Http.post("/authenticator/toggle-setting", data);
}
