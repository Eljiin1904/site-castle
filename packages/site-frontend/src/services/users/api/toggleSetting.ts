import { UserSettingKey } from "@core/types/users/UserSettings";
import { Http } from "@client/services/http";

export function toggleSetting(data: {
  id: UserSettingKey;
  value: boolean;
}): Promise<void> {
  return Http.post("/users/toggle-setting", data);
}
