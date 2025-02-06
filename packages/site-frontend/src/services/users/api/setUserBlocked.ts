import { Http } from "@client/services/http";

export function setUserBlocked(data: {
  userId: string;
  block: boolean;
}): Promise<void> {
  return Http.post("/users/set-user-blocked", data);
}
