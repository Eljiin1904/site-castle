import { ChatRainPayout } from "@core/types/chat/ChatRainPayout";
import { Http } from "@client/services/http";

export function getRainPayouts(data: {
  rainId: string;
  limit: number;
  page: number;
}): Promise<{ payouts: ChatRainPayout[] }> {
  return Http.post("/chat/get-rain-payouts", data);
}
