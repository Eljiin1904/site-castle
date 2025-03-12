import { Validation } from "@core/services/validation";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Admin } from "@server/services/admin";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/edit-boost-event",
  body: Validation.object({
    eventId: Validation.string().required("Event ID is required."),
    startDate: Validation.date().required("Start Date is required"),
    endDate: Validation.date()
      .min(Validation.ref("startDate"), "End date must be after start date.")
      .required("End Date is required"),
  }),
  callback: async (req, res) => {
    const { eventId, startDate, endDate } = req.body;
    const admin = req.user;

    await Database.collection("reward-boost-events").updateOne(
      { _id: eventId },
      { $set: { startDate, endDate } },
    );

    await Admin.log({
      kind: "reward-boost-event-edit",
      admin: Users.getBasicUser(admin),
      eventId,
    });

    res.json({});
  },
});
