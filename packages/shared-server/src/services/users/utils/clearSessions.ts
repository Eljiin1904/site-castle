import { UserDocument } from "@core/types/users/UserDocument";
import { Database } from "#server/services/database";

export async function clearSessions(
  user: UserDocument,
  excludeSessionId?: string,
) {
  const { deletedCount } = await Database.collection(
    "user-sessions",
  ).deleteMany({
    _id: { $ne: excludeSessionId },
    session: { $regex: user._id },
  });

  return { deletedCount };
}
