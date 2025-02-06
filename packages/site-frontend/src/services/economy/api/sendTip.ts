import { Http } from "@client/services/http";

export function sendTip(data: {
  lookup: string;
  tipAmount: number;
  tfac?: string;
}): Promise<void> {
  return Http.post("/economy/send-tip", data);
}
