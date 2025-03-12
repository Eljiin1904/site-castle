import { Validation } from "@core/services/validation";
import { SiteSettingId, SiteSettingValue } from "@core/types/site/SiteSettingDocument";
import { Users } from "@server/services/users";
import { Admin } from "@server/services/admin";
import { Site } from "@server/services/site";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-setting",
  body: Validation.object({
    settingId: Validation.string<SiteSettingId>().required(),
    settingValue: Validation.mixed<SiteSettingValue>().required(),
  }),
  callback: async (req, res) => {
    const { settingId, settingValue } = req.body;
    const admin = req.user;

    await Site.setSetting({
      key: settingId,
      value: settingValue,
    });

    await Admin.log({
      kind: "setting-edit",
      admin: Users.getBasicUser(admin),
      settingId,
      settingValue,
    });

    res.json({});
  },
});
