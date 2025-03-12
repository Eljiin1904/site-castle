import { endOfHour, startOfHour } from "date-fns";
import { Validation } from "@core/services/validation";
import { Items } from "@core/services/items";
import { Rewards } from "@server/services/rewards";
import { Admin } from "@server/services/admin";
import { Users } from "@server/services/users";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export default Http.createApiRoute({
  type: "post",
  path: "/create-raffle",
  body: Validation.object({
    displayName: Validation.string().required("Display name is required."),
    itemIds: Validation.array()
      .of(Validation.string().required())
      .min(1)
      .required("Item IDs are required."),
    startDate: Validation.date().required("Start Date is required"),
    endDate: Validation.date()
      .min(Validation.ref("startDate"), "End date must be after start date.")
      .required("End Date is required"),
  }),
  callback: async (req, res) => {
    const { displayName, itemIds, startDate, endDate } = req.body;
    const admin = req.user;

    const documents = await Database.collection("items")
      .find({ _id: { $in: itemIds } })
      .toArray();

    if (documents.length !== itemIds.length) {
      throw new HandledError(`Invalid items, ${documents.length} != ${itemIds.length}`);
    }

    const items = documents.map((x) => Items.getLoot(x));
    items.sort((a, b) => a.lootValue - b.lootValue);

    const raffle = await Rewards.createRaffle({
      displayName,
      items,
      startDate: startOfHour(startDate),
      endDate: endOfHour(endDate),
    });

    await Admin.log({
      kind: "raffle-create",
      admin: Users.getBasicUser(admin),
      raffle,
    });

    res.json({ raffle });
  },
});
