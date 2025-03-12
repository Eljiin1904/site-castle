import { addHours } from "date-fns";
import { Validation } from "@core/services/validation";
import { UserBetSessionDocument } from "@core/types/users/UserBetSessionDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";

export default Http.createApiRoute({
  type: "post",
  path: "/get-bet-token",
  secure: true,
  body: Validation.object({
    tfac: Validation.tfac(),
  }),
  callback: async (req, res) => {
    const { tfac } = req.body;
    const user = req.user;

    await Site.validateAuthenticatorCode({ user, tfac });

    const betSession: UserBetSessionDocument = {
      _id: Ids.object(),
      timestamp: new Date(),
      userId: user._id,
      expires: addHours(Date.now(), 24),
    };

    await Database.collection("user-bet-sessions").insertOne(betSession);

    res.json({ betToken: betSession._id });
  },
});
