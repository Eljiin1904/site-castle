import { endOfHour, startOfHour } from "date-fns";
import { Validation } from "@core/services/validation";
import { HolidayChest, HolidayChestOptions } from "@core/types/rewards/HolidayChest";
import { HolidayEventDocument } from "@core/types/rewards/HolidayEventDocument";
import { Strings } from "@core/services/strings";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Chests } from "@server/services/chests";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-holiday",
  body: Validation.object({
    displayName: Validation.string().required("Display name is required."),
    currencyRate: Validation.number().required("Currency rate is required."),
    raffleRate: Validation.number().required("Raffle rate is required."),
    boostRate: Validation.number().required("Boost rate is required."),
    chests: Validation.array()
      .json()
      .of(
        Validation.object({
          id: Validation.string().required(),
          holidayCost: Validation.currency("Holiday cost"),
        }),
      )
      .required(),
    startDate: Validation.date().required("Start date is required"),
    endDate: Validation.date()
      .min(Validation.ref("startDate"), "End date must be after start date.")
      .required("End date is required"),
    adventResetDate: Validation.date().required("Advent date is required"),
    adventBonusDays: Validation.array().of(Validation.number().required()).required(),
  }),
  callback: async (req, res) => {
    const {
      displayName,
      currencyRate,
      raffleRate,
      boostRate,
      startDate,
      endDate,
      adventResetDate,
      adventBonusDays,
    } = req.body;
    const admin = req.user;

    const chests = await buildChests(req.body.chests);

    const holiday: HolidayEventDocument = {
      _id: Ids.short(),
      displayName,
      slug: Strings.toSlug(displayName),
      currencyRate,
      raffleRate,
      boostRate,
      chests,
      createDate: new Date(),
      startDate: startOfHour(startDate),
      endDate: endOfHour(endDate),
      adventResetDate: startOfHour(adventResetDate),
      adventBonusDays,
    };

    await Database.collection("holiday-events").insertOne(holiday);

    await Admin.log({
      kind: "holiday-create",
      admin: Users.getBasicUser(admin),
      holiday,
    });

    res.json({ holiday });
  },
});

async function buildChests(options: HolidayChestOptions[]) {
  const documents = await Database.collection("chests")
    .find({
      _id: { $in: options.map((x) => x.id) },
      kind: "holiday-case",
    })
    .toArray();

  const chests: HolidayChest[] = [];

  for (const info of options) {
    const document = documents.find((x) => x._id === info.id);

    if (!document) {
      throw new HandledError(`Invalid chests, failed lookup on ${info.id}`);
    }

    chests.push({
      ...Chests.getBasicChest(document),
      holidayCost: info.holidayCost,
    });
  }

  chests.sort((a, b) => a.openCost - b.openCost);

  return chests;
}
