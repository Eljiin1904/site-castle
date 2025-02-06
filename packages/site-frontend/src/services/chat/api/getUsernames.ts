import { Http } from "@client/services/http";

export function getUsernames(data: {
  searchText: string | undefined;
  limit: number;
}): Promise<{
  usernames: string[];
}> {
  return Http.post("/chat/get-usernames", data);
}
