import { ChestWithCount } from "@core/types/chests/ChestDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";

export async function addToCasesOpened({
  chests,
  user,
}: {
  chests: ChestWithCount[];
  user: UserDocument;
}) {
  let { casesOpened = {} } = user.meta;

  for (let i = 0; i < chests.length; i++) {
    const chest = chests[i];

    casesOpened[chest._id] = casesOpened?.[chest._id]
      ? casesOpened[chest._id] + chest.count
      : chest.count;
  }

  casesOpened = Object.fromEntries(Object.entries(casesOpened).sort((a, b) => b[1] - a[1]));

  await Database.collection("users").updateOne(
    { _id: user._id },
    { $set: { "meta.casesOpened": casesOpened } },
  );
}
