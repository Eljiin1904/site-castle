import { Http } from "@client/services/http";

export function editEmail(data: {
  email: string;
  password: string;
  captchaToken: string;
}): Promise<void> {
  return Http.post("/users/edit-email", data);
}
