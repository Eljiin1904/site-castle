import { minutesToMilliseconds } from "date-fns";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { CustomerIO } from "@server/services/customer-io";

export default () =>
  setInterval(System.tryCatch(main), minutesToMilliseconds(1));

async function main() {
  const user = await Database.collection("users").findOneAndUpdate(
    {
      "suspension.reason": "selfExclusion.suspended",
      "suspension.endDate": {
        $gt: new Date(0),
        $lt: new Date(),
      },
    },
    {
      $set: { suspension: {} },
    },
  );

  if (user) {
    await CustomerIO.updateUser(user._id, {
      unsubscribed: false,
    });

    await CustomerIO.sendExclusionFollowUp(user);
  }
}
