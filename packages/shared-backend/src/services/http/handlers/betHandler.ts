import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "@server/services/http";

const schema = Validation.object({
  betToken: Validation.string().required("Bet token is required."),
});

export const betHandler = Http.createHandler(async (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new HandledError("Route must be secure to be a bet.");
  }

  if (req.user.tfa.enabled && req.user.settings.bet2fa) {
    const { betToken } = await schema.validate(req.body);

    const exists = await Database.exists("user-bet-sessions", {
      _id: betToken,
      userId: req.user._id,
    });

    if (!exists) {
      throw new HandledError("Bet failed 2FA.");
    }
  }

  next();
});
