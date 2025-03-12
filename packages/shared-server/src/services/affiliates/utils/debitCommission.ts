import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Database } from "#server/services/database";
import { Transactions } from "#server/services/transactions";

export async function debitCommission({
  user,
  amount,
  location,
}: {
  user: UserDocument;
  amount: number;
  location: UserLocation;
}) {
  await Database.collection("users").updateOne(
    { _id: user._id },
    { $inc: { "affiliate.commissionBalance": -amount } },
  );

  await Transactions.createTransaction({
    user,
    autoComplete: true,
    kind: "affiliate-commission-claim",
    amount,
    location,
  });
}
