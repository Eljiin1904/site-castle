import {
  SiteSettingId,
  SiteSettingValue,
} from "@core/types/site/SiteSettingDocument";
import { Http } from "@client/services/http";

export function editSetting(data: {
  settingId: SiteSettingId;
  settingValue: SiteSettingValue;
}) {
  return Http.post("/site/edit-setting", data);
}
