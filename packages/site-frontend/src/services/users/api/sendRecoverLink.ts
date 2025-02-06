import { Http } from "@client/services/http";

export function sendRecoverLink(data: {
  email: string;
  captchaToken: string;
}): Promise<void> {
  return Http.post("/users/send-recover-link", data);
}
