import {
  UserActionKind,
  UserActionKindData,
} from "@core/types/users/UserActionKind";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";

export async function trackAction({
  user,
  ip,
  ...data
}: {
  user: UserDocument;
  ip: string | undefined;
  kind: UserActionKind;
} & UserActionKindData) {
  const location = await Http.getLocation(ip);

  await Database.collection("user-actions").insertOne({
    _id: Ids.object(),
    timestamp: new Date(),
    user: Users.getBasicUser(user),
    location,
    ...data,
  });

  await Database.collection("users").updateOne(
    { _id: user._id },
    { $set: { "meta.lastLocation": location } },
  );
}
