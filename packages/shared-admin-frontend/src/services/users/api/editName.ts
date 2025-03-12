import { Http } from "@client/services/http";

export function editName(data: { userId: string; newName: string }) {
  return Http.post("/users/edit-name", data);
}
