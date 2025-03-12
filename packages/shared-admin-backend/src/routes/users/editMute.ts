import { Validation } from "@core/services/validation";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Notifications } from "@server/services/notifications";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-mute",
  body: Validation.object({
    userId: Validation.string().required("User ID is required."),
    enabled: Validation.boolean().required(),
    reason: Validation.string().oneOf(Users.muteReasons, "Invalid reason."),
    endDate: Validation.date(),
  }),
  callback: async (req, res) => {
    const { userId, enabled, reason, endDate } = req.body;
    const admin = req.user;

    const user = await Database.collection("users").findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "mute.reason": enabled ? reason : null,
          "mute.startDate": enabled ? new Date() : null,
          "mute.endDate": enabled ? endDate : null,
        },
      },
    );

    if (!user) {
      throw new HandledError("Target user not found.");
    }

    if (enabled && reason && endDate) {
      await Notifications.createNotification({
        userId: user._id,
        kind: "chat-mute",
        reason,
        endDate,
      });
    }

    await Admin.log({
      kind: "user-mute",
      admin: Users.getBasicUser(admin),
      user: Users.getBasicUser(user),
      reason: enabled ? reason : undefined,
      endDate: enabled ? endDate : undefined,
    });

    res.json({});
  },
});
