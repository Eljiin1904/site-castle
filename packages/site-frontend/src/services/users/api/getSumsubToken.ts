import { Http } from "@client/services/http";

export function getSumsubToken(): Promise<{
  token: string;
}> {
  return Http.post("/verification/get-sumsub-token");
}