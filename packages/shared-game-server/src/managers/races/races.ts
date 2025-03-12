import { RaceLeader } from "@core/types/rewards/RaceLeader";
import { RaceDocument } from "@core/types/rewards/RaceDocument";
import { System } from "@server/services/system";
import { Database } from "@server/services/database";
import { Rewards } from "@server/services/rewards";
import { Users } from "@server/services/users";

export default () => System.tryCatch(main)();

async function main() {
  setInterval(System.tryCatch(onReportInterval), 15000);
  setInterval(System.tryCatch(onProcessInterval), 5000);
}

async function onReportInterval() {
  const races = Database.collection("races").find({
    endDate: { $gt: new Date() },
    startDate: { $lt: new Date() },
  });

  for await (const race of races) {
    const { reports, leaders } = await getState(race);

    await Database.collection("races").updateOne(
      { _id: race._id },
      {
        $set: {
          reports,
          leaders,
          lastReportDate: new Date(),
        },
      },
    );
  }
}

async function onProcessInterval() {
  const race = await Database.collection("races").findOne({
    endDate: { $lt: new Date() },
    processed: { $exists: false },
  });

  if (!race) {
    return;
  }

  const { reports, leaders } = await getState(race);

  for (let i = 0; i < leaders.length; i++) {
    const leader = leaders[i];

    Rewards.createClaim({
      kind: "race-payout",
      userId: leader.user.id,
      race: Rewards.getBasicRace(race),
      rank: i + 1,
      tokenAmount: leader.prizeAmount,
    }).catch((err) => System.handleError(err));
  }

  await Database.collection("races").updateOne(
    { _id: race._id },
    {
      $set: {
        reports,
        leaders,
        lastReportDate: new Date(),
        processed: true,
        processDate: new Date(),
      },
    },
  );
}

async function getState(race: RaceDocument) {
  const reports = await Rewards.aggregateRaceReports({
    sort: race.kind === "holiday" ? "xpGained" : "wagerAmount",
    minDate: race.startDate,
    maxDate: race.endDate,
  });

  const winnerIds = reports.slice(0, race.payouts.length).map((x) => x.userId);

  const users = await Database.collection("users")
    .find({ _id: { $in: winnerIds } })
    .toArray();

  const leaders: RaceLeader[] = [];

  for (const user of users) {
    const index = winnerIds.indexOf(user._id);
    const report = reports[index];

    leaders[index] = {
      rank: index + 1,
      user: Users.getBasicUser(user),
      wagerAmount: report.wagerAmount,
      xpGained: report.xpGained,
      prizeAmount: race.payouts[index],
    };
  }

  return { reports, leaders };
}
