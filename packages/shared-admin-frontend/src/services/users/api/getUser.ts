import { UserDocument } from "@core/types/users/UserDocument";
import { Http } from "@client/services/http";

export function getUser(data: { userId: string }): Promise<{
  user: UserDocument;
}> {
  return Http.post("/users/get-user", data);
}
