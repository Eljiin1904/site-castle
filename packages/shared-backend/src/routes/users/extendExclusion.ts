import { addDays } from "date-fns";
import { UserBanReason } from "@core/types/users/UserBanData";
import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { Users } from "#app/services/users";
import { CustomerIO } from "@server/services/customer-io";
import { HandledError } from "@server/services/errors";

export default Http.createApiRoute({
  type: "post",
  path: "/extend-exclusion",
  secure: true,
  body: Validation.object({
    timeIndex: Validation.index("Duration", 4),
  }),
  callback: async (req, res) => {
    const { timeIndex } = req.body;
    const user = req.user;

    if (Users.isSuspended(user.suspension)) {
      throw new HandledError("errors.users.alreadyExcluded");
    }

    const days = [1, 7, 30, 90, 100000][timeIndex];
    const startDate = new Date();
    const endDate = addDays(startDate, days);
    const reason: UserBanReason = "self-exclude";

    await Database.collection("users").updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          "ban.reason": reason,
          "ban.startDate": startDate,
          "ban.endDate": endDate,
        },
      },
    );

    await Users.clearSessions(user);

    await Users.trackAction({
      user,
      kind: "extend-exclusion",
      ip: req.trueIP,
      endDate,
    });

    await CustomerIO.updateUser(user._id, {
      unsubscribed: true,
    });

    res.json({});
  },
});
