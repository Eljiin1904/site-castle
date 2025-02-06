import { Http } from "@client/services/http";

export function checkUsername(data: { username: string }): Promise<{
  isAvailable: boolean;
}> {
  return Http.post("/users/check-username", data);
}
