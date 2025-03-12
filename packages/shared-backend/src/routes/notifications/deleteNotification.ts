import { Validation } from "@core/services/validation";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/delete-notification",
  secure: true,
  body: Validation.object({
    notificationId: Validation.string().required("Notification ID is required."),
  }),
  callback: async (req, res) => {
    const { notificationId } = req.body;

    const { deletedCount } = await Database.collection("notifications").deleteOne({
      _id: notificationId,
      userId: req.user._id,
    });

    if (deletedCount === 0) {
      throw new HandledError("Invalid notification id.");
    }

    res.json({});
  },
});
