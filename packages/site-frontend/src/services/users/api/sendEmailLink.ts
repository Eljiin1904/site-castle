import { Http } from "@client/services/http";

export function sendEmailLink(): Promise<void> {
  return Http.post("/users/send-email-link");
}
