import { Http } from "@client/services/http";

export function addBot(data: {
  battleId: string;
  seat: number;
}): Promise<void> {
  return Http.post("/case-battles/add-bot", data);
}
