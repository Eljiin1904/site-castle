import { Http } from "@client/services/http";
import { values } from "lodash";

export function editPassword(data: {
  currentPassword?: string | undefined;
  newPassword: string;
  captchaToken: string;
}): Promise<void> {
  return Http.post("/users/edit-password", data);
}
