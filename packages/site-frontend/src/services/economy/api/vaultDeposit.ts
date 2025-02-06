import { Http } from "@client/services/http";

export async function vaultDeposit(data: {
  tokenAmount: number;
}): Promise<void> {
  return await Http.post("/economy/vault-deposit", data);
}
