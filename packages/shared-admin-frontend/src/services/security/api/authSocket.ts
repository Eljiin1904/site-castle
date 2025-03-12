import { Http } from "@client/services/http";

export function authSocket(): Promise<{
  token: string;
}> {
  return Http.post("/auth/socket");
}
