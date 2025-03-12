import { RewardBoostEventDocument } from "@core/types/rewards/RewardBoostEventDocument";
import { Validation } from "@core/services/validation";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Admin } from "@server/services/admin";
import { Rewards } from "@server/services/rewards";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-boost-event",
  body: Validation.object({
    timeframe: Validation.string().oneOf(Rewards.boostTimeframes, "Invalid timeframe.").required(),
    startDate: Validation.date().required("Start Date is required"),
    endDate: Validation.date()
      .min(Validation.ref("startDate"), "End date must be after start date.")
      .required("End Date is required"),
  }),
  callback: async (req, res) => {
    const { timeframe, startDate, endDate } = req.body;
    const admin = req.user;

    const eventId = Ids.short();

    const event: RewardBoostEventDocument = {
      _id: eventId,
      timeframe,
      startDate,
      endDate,
    };

    await Database.collection("reward-boost-events").insertOne(event);

    await Admin.log({
      kind: "reward-boost-event-create",
      admin: Users.getBasicUser(admin),
      event,
    });

    res.json({ event });
  },
});
