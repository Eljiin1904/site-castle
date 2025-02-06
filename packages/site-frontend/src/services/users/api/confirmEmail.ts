import { Http } from "@client/services/http";

export function confirmEmail(data: { confirmToken: string }): Promise<void> {
  return Http.post("/users/confirm-email", data);
}
