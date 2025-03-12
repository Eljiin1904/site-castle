import { Transactions } from "@core/services/transactions";
import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { TransactionKindData } from "@core/types/transactions/TransactionKind";
import { TransactionTag } from "@core/types/transactions/TransactionTag";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { getAffiliate } from "../helpers/getAffiliate";
import { getUser } from "../helpers/getUser";
import { completeTransaction } from "./completeTransaction";
import { getTransactionId } from "./getTransactionId";

export async function createTransaction({
  transactionId,
  user,
  autoComplete,
  ...options
}: {
  transactionId?: string;
  user: UserDocument;
  amount: number;
  autoComplete: boolean;
} & TransactionKindData) {
  if (!transactionId) {
    transactionId = await getTransactionId();
  }

  const category = Transactions.getCategory(options.kind);

  const tags: TransactionTag[] = [];

  if ("bet" in options) {
    tags.push("bet");
  }
  if (Transactions.gameCategories.includes(category)) {
    tags.push("game");
  }

  const affiliate = await getAffiliate({ category, user });

  const transaction: TransactionDocument = {
    _id: transactionId,
    timestamp: new Date(),
    user: getUser(user),
    referer: user.referer,
    affiliate,
    category,
    tags,
    value: Math.abs(options.amount),
    balance: user.tokenBalance,
    status: "pending",
    statusDate: new Date(),
    ...options,
  };

  // for debits, escrow the tokens
  if (options.amount < 0) {
    const { matchedCount } = await Database.collection("users").updateOne(
      {
        _id: user._id,
        tokenBalance: { $gte: transaction.value },
      },
      {
        $inc: { tokenBalance: -transaction.value },
      },
    );

    if (matchedCount !== 1) {
      throw new HandledError("Invalid balance for transaction.");
    }

    user.tokenBalance -= transaction.value;
  }

  await Database.collection("transactions").insertOne(transaction);

  if (autoComplete) {
    await completeTransaction({ user, transaction });
  }

  return transaction;
}
