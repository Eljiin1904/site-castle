import { Http } from "@client/services/http";

export async function getSupportHash(): Promise<{
  hash: string;
}> {
  return await Http.post("/users/get-support-hash");
}
