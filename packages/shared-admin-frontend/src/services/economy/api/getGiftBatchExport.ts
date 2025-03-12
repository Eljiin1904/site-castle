import { Http } from "@client/services/http";

export function getGiftBatchExport(data: { batchId: string }): Promise<{
  text: string;
}> {
  return Http.post("/economy/get-gift-batch-export", data);
}
