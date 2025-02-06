import { BasicUser } from "@core/types/users/BasicUser";
import { Http } from "@client/services/http";

export function getBlockedUsers(): Promise<{
  users: BasicUser[];
}> {
  return Http.post("/users/get-blocked-users");
}
