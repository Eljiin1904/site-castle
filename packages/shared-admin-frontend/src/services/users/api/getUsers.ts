import { UserDocument } from "@core/types/users/UserDocument";
import { Http } from "@client/services/http";

export function getUsers(data: {
  searchText: string | undefined;
  searchIndex: number;
  sortIndex: number;
  limit: number;
  page: number;
}): Promise<{
  users: UserDocument[];
}> {
  return Http.post("/users/get-users", data);
}
