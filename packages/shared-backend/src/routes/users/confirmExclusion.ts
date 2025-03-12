import { addDays } from "date-fns";
import { UserSuspensionReason } from "@core/types/users/UserSuspensionData";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { CustomerIO } from "@server/services/customer-io";
import { Security } from "@server/services/security";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/confirm-exclusion",
  restricted: true,
  secure: false,
  body: Validation.object({
    confirmToken: Validation.token(),
  }),
  callback: async (req, res) => {
    const { confirmToken } = req.body;

    const { userId } = await Security.consumeToken({
      kind: "exclude-confirm",
      token: confirmToken,
    });

    const startDate = new Date();
    const endDate = addDays(startDate, 1);
    const reason: UserSuspensionReason = "self-exclude";

    const user = await Database.collection("users").findOne({ _id: userId });

    if (!user) {
      throw new HandledError("User lookup failed.");
    }

    if (Users.isSuspended(user.suspension)) {
      throw new HandledError("You are already excluded.");
    }

    await Database.collection("users").updateOne(
      { _id: userId },
      {
        $set: {
          "suspension.reason": reason,
          "suspension.startDate": startDate,
          "suspension.endDate": endDate,
        },
      },
    );

    await Users.trackAction({
      user,
      kind: "confirm-exclusion",
      ip: req.trueIP,
    });

    await CustomerIO.updateUser(user._id, {
      unsubscribed: true,
    });

    res.json({});
  },
});
