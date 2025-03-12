import { endOfHour, startOfHour } from "date-fns";
import { Validation } from "@core/services/validation";
import { Rewards } from "@server/services/rewards";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-race",
  body: Validation.object({
    displayName: Validation.string().required("Display name is required."),
    payouts: Validation.array().of(Validation.currency("amount")).required(),
    startDate: Validation.date().required("Start Date is required"),
    endDate: Validation.date()
      .min(Validation.ref("startDate"), "End date must be after start date.")
      .required("End Date is required"),
    forHoliday: Validation.boolean(),
  }),
  callback: async (req, res) => {
    const { displayName, payouts, startDate, endDate, forHoliday } = req.body;
    const admin = req.user;

    const race = await Rewards.createRace({
      kind: forHoliday ? "holiday" : "custom",
      displayName,
      payouts,
      startDate: startOfHour(startDate),
      endDate: endOfHour(endDate),
    });

    await Admin.log({
      kind: "race-create",
      admin: Users.getBasicUser(admin),
      race,
    });

    res.json({ race });
  },
});
