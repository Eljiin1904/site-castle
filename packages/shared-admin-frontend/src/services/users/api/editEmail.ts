import { Http } from "@client/services/http";

export function editEmail(data: { userId: string; newEmail: string }) {
  return Http.post("/users/edit-email", data);
}
