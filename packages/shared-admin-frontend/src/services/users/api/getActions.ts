import { UserActionDocument } from "@core/types/users/UserActionDocument";
import { UserActionKind } from "@core/types/users/UserActionKind";
import { Http } from "@client/services/http";

export function getActions(data: {
  userId: string;
  kind: UserActionKind | undefined;
  limit: number;
  page: number;
}): Promise<{
  actions: UserActionDocument[];
}> {
  return Http.post("/users/get-actions", data);
}
