import { Http } from "@client/services/http";

export async function getHash(): Promise<{
  hash: string;
}> {
  return await Http.post("/support/get-hash");
}
