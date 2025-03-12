import { addDays } from "date-fns";
import { SiteActivityDocument } from "@core/types/site/SiteActivityDocument";
import { SiteActivityKindData } from "@core/types/site/SiteActivityKind";
import { Intimal } from "@core/services/intimal";
import { PlayerUser } from "@core/types/users/PlayerUser";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import { settings } from "../constants/settings";

type CreateOptions = {
  user: PlayerUser;
  amount: number;
} & SiteActivityKindData;

export async function trackActivity(options: CreateOptions) {
  const { activityThreshold } = await settings.cache();
  const threshold = Intimal.fromDecimal(activityThreshold);

  if (options.amount < threshold) {
    return;
  }

  const activity: SiteActivityDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    expires: addDays(Date.now(), 30),
    ...options,
  };

  await Database.collection("site-activity").insertOne(activity);

  return activity;
}
