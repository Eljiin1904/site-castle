import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Transactions } from "#server/services/transactions";
import { Users } from "#server/services/users";
import { Notifications } from "#server/services/notifications";

export async function createTip({
  sender,
  receiver,
  tipAmount,
  location,
}: {
  sender: UserDocument;
  receiver: UserDocument;
  tipAmount: number;
  location: UserLocation;
}) {
  await Transactions.createTransaction({
    user: sender,
    autoComplete: true,
    kind: "tip-send",
    amount: -tipAmount,
    location,
    receiver: Users.getBasicUser(receiver),
  });

  await Transactions.createTransaction({
    user: receiver,
    autoComplete: true,
    kind: "tip-receive",
    amount: tipAmount,
    sender: Users.getBasicUser(sender),
  });

  await Notifications.createNotification({
    userId: receiver._id,
    kind: "tip-receive",
    amount: tipAmount,
    sender: Users.getBasicUser(sender),
  });
}
