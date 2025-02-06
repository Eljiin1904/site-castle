import { Http } from "@client/services/http";

export async function getTipUsage(): Promise<{
  tipUsage: number;
}> {
  return await Http.post("/economy/get-tip-usage");
}
