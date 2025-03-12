import { Http } from "@client/services/http";
import { UserRole } from "@core/types/users/UserRole";

export function editRole(data: { userId: string; newRole: UserRole }) {
  return Http.post("/users/edit-role", data);
}
