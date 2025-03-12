import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserStats } from "@core/types/users/UserStats";
import { UserMetaData } from "@core/types/users/UserMetaData";
import { Rewards } from "@core/services/rewards";
import { Database } from "#server/services/database";
import { Users } from "#server/services/users";
import { HandledError } from "#server/services/errors";

interface UserUpdates {
  $set: Record<string, any>;
  $inc: Record<string, number>;
}

export async function completeTransaction({
  user,
  transaction,
}: {
  user: UserDocument;
  transaction: TransactionDocument;
}) {
  const stats = Users.getStatsFromTransaction(transaction);
  const metaData = getUserMetaData({ user, transaction });

  await setCompleted({ user, transaction, stats });
  await updateUser({ user, transaction, stats, metaData });
}

async function setCompleted({
  user,
  transaction,
  stats,
}: {
  user: UserDocument;
  transaction: TransactionDocument;
  stats: Partial<UserStats>;
}) {
  // for debits, we escrow the tokens on create
  const balance =
    transaction.amount > 0 ? user.tokenBalance : transaction.balance;

  const { modifiedCount } = await Database.collection("transactions").updateOne(
    {
      _id: transaction._id,
      status: { $in: ["pending", "processing"] },
    },
    {
      $set: {
        balance,
        status: "completed",
        statusDate: new Date(),
        stats,
      },
    },
  );

  if (modifiedCount === 0) {
    throw new HandledError("Transaction status not valid for complete.");
  }
}

async function updateUser({
  user,
  transaction,
  stats,
  metaData,
}: {
  user: UserDocument;
  transaction: TransactionDocument;
  stats: Partial<UserStats>;
  metaData: Partial<UserMetaData>;
}) {
  const updates: UserUpdates = { $set: {}, $inc: {} };

  // for debits, we escrow the tokens on create
  if (transaction.amount > 0) {
    updates.$inc["tokenBalance"] = transaction.amount;
    user.tokenBalance += transaction.amount;
  }

  if (
    transaction.category === "deposits" ||
    transaction.kind === "tip-receive"
  ) {
    updates.$inc["meta.wagerRequirement"] = transaction.value;
  }

  if ("bet" in transaction) {
    updates.$inc["gemBalance"] = transaction.bet.gems;

    updates.$inc["xp"] = transaction.bet.xp;
    user.xp += transaction.bet.xp;

    const previousLevel = Users.getLevel(user.xp - transaction.bet.xp);
    const currentLevel = Users.getLevel(user.xp);

    if (currentLevel !== previousLevel) {
      for (let level = previousLevel + 1; level <= currentLevel; level++) {
        const { chestId, chestValue } = Rewards.getLevelInfo(level);
        const keys = 3;

        setOrInc(updates.$inc, `chestKeys.${chestId}`, keys);
        setOrInc(updates.$inc, "meta.levelCaseValue", chestValue * keys);
        setOrInc(updates.$inc, "meta.levelCaseBalance", chestValue * keys);
      }
    }

    if (user.meta.wagerRequirement) {
      if (user.meta.wagerRequirement > transaction.value) {
        updates.$inc["meta.wagerRequirement"] = -transaction.value;
      } else {
        updates.$set["meta.wagerRequirement"] = 0;
      }
    }
  }

  for (const [key, value] of Object.entries(stats)) {
    updates.$inc[`stats.${key}`] = value;
  }

  for (const [key, value] of Object.entries(metaData)) {
    updates.$set[`meta.${key}`] = value;
  }

  await Database.collection("users").updateOne(
    { _id: user._id },
    {
      $set: updates.$set,
      $inc: updates.$inc,
    },
  );
}

function getUserMetaData({
  user,
  transaction,
}: {
  user: UserDocument;
  transaction: TransactionDocument;
}) {
  const { category } = transaction;
  const data: Partial<UserMetaData> = {};

  if ("bet" in transaction) {
    data.lastBetDate = new Date();
  } else if (category === "deposits") {
    data.lastDepositDate = new Date();

    if (!user.meta.lastDepositDate) {
      data.firstDepositDate = new Date();
    }

    if (Users.isChurned(user)) {
      data.reactivateDate = new Date();
    }
  } else if (category === "withdrawals") {
    data.lastWithdrawDate = new Date();

    if (!user.meta.lastWithdrawDate) {
      data.firstWithdrawDate = new Date();
    }
  }

  return data;
}

function setOrInc(obj: Record<string, number>, key: string, value: number) {
  if (obj[key]) {
    obj[key] += value;
  } else {
    obj[key] = value;
  }
}
