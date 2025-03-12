import { Http } from "@client/services/http";
import { UserTag } from "@core/types/users/UserTag";

export function editTags(data: { userId: string; newTags: UserTag[] }) {
  return Http.post("/users/edit-tags", data);
}
