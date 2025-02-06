import { Http } from "@client/services/http";

export function authenticatorRecover(data: {
  backupKey: string;
  userId: string;
}): Promise<void> {
  return Http.post("/authenticator/recover", data);
}
