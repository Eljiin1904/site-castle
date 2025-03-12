import { startOfHour } from "date-fns";
import { UserReport } from "@core/types/users/UserReport";
import { BasicUser } from "@core/types/users/BasicUser";
import { Database } from "#server/services/database";

export type ReportIncrements = Partial<Record<keyof UserReport, number>>;

export async function incrementReport({
  user,
  inc,
}: {
  user: BasicUser;
  inc: ReportIncrements;
}) {
  const timeframe = startOfHour(Date.now());
  const timeId = Math.floor(timeframe.getTime() / 1000 / 60 / 60).toString();

  await Database.collection("user-reports").updateOne(
    {
      _id: `${timeId}_${user.id}`,
    },
    {
      $setOnInsert: {
        timeframe,
        userId: user.id,
        userRole: user.role,
        userTags: user.tags,
      },
      $inc: inc,
    },
    {
      upsert: true,
    },
  );
}
