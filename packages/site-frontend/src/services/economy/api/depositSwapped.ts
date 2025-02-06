import { Http } from "@client/services/http";

export function depositSwapped(): Promise<{
  url: string;
}> {
  return Http.post("/economy/deposit-swapped");
}
