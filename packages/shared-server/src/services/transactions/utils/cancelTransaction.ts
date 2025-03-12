import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function cancelTransaction({
  transaction,
  cancelReason,
}: {
  transaction: TransactionDocument;
  cancelReason?: string;
}) {
  const { modifiedCount } = await Database.collection("transactions").updateOne(
    {
      _id: transaction._id,
      status: { $in: ["pending", "processing"] },
    },
    {
      $set: {
        status: "cancelled",
        statusDate: new Date(),
        note: cancelReason,
      },
    },
  );

  if (modifiedCount === 0) {
    throw new HandledError("Transaction status not valid for cancel.");
  }

  // for debits, we escrow the tokens on create, so refund them
  if (transaction.amount < 0) {
    await Database.collection("users").updateOne(
      { _id: transaction.user.id },
      { $inc: { tokenBalance: transaction.value } },
    );
  }
}
