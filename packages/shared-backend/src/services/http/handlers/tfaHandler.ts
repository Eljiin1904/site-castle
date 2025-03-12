import { authenticator } from "otplib";
import { Validation } from "@core/services/validation";
import { UserSettingKey } from "@core/types/users/UserSettings";
import { Http } from "@server/services/http";
import { HandledError } from "@server/services/errors";

const schema = Validation.object({
  tfac: Validation.string().required("2FA code is required."),
});

export type TfaOptions = {
  settingKey?: UserSettingKey;
};

export const tfaHandler = (options: TfaOptions) =>
  Http.createHandler(async (req, res, next) => {
    const { settingKey } = options;

    if (!req.isAuthenticated()) {
      throw new HandledError("Route must be secure to have 2FA.");
    }

    const user = req.user;

    if (!user.tfa.enabled || (settingKey && !user.settings[settingKey])) {
      return next();
    }

    const { tfac } = await schema.validate(req.body);
    const isValid = authenticator.check(tfac, user.tfa.secret);

    if (!isValid) {
      throw new HandledError("Invalid 2FA code.");
    }

    next();
  });
