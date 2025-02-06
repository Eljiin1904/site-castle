import { Http } from "@client/services/http";

export function createWithdraw(data: {
  itemId: string;
  tfac: string | undefined;
}): Promise<void> {
  return Http.post("/market/create-withdraw", data);
}
