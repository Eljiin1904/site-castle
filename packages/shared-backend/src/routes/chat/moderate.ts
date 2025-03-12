import { Database } from "@server/services/database";
import { Validation } from "@core/services/validation";
import { Admin } from "@server/services/admin";
import { Notifications } from "@server/services/notifications";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";
import { Site } from "#app/services/site";
import { Users } from "#app/services/users";

export default Http.createApiRoute({
  type: "post",
  path: "/moderate",
  secure: true,
  body: Validation.object({
    messageId: Validation.string().required("Message ID is required."),
    deleteMessage: Validation.boolean().required(),
    muteUser: Validation.boolean().required(),
    reason: Validation.string().oneOf(Users.muteReasons, "Invalid reason."),
    endDate: Validation.date(),
  }),
  callback: async (req, res) => {
    const { messageId, deleteMessage, muteUser, reason, endDate } = req.body;
    const admin = req.user;

    await Site.validatePermission(admin, "manageChat");

    const message = await Database.collection("chat-messages").findOne({
      _id: messageId,
    });

    if (!message) {
      throw new HandledError("Failed to find message.");
    }

    if (deleteMessage) {
      await Database.collection("chat-messages").updateOne(
        { _id: messageId },
        { $set: { hidden: true } },
      );

      if (message.agent === "user") {
        await Notifications.createNotification({
          userId: message.user.id,
          kind: "chat-message-delete",
        });
      }

      await Admin.log({
        kind: "chat-delete",
        admin: Users.getBasicUser(admin),
        message,
      });
    }

    if (muteUser && reason && endDate && message.agent === "user") {
      const userId = message.user.id;

      const user = await Database.collection("users").findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            "mute.reason": reason,
            "mute.startDate": new Date(),
            "mute.endDate": endDate,
          },
        },
      );

      if (!user) {
        throw new HandledError("Target user not found.");
      }

      await Notifications.createNotification({
        userId,
        kind: "chat-mute",
        reason,
        endDate,
      });

      await Admin.log({
        kind: "user-mute",
        admin: Users.getBasicUser(admin),
        user: Users.getBasicUser(user),
        reason,
        endDate,
      });
    }

    res.json({});
  },
});
