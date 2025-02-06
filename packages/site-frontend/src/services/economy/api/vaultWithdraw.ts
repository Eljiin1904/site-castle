import { Http } from "@client/services/http";

export async function vaultWithdraw(data: {
  tokenAmount: number;
  tfac?: string;
}): Promise<void> {
  return await Http.post("/economy/vault-withdraw", data);
}
