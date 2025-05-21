import { Http } from "@client/services/http";
import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";
import { BlackjackApiResponse } from "@core/types/blackjack/BlackjackApiResponse";

export default async function (data: {
  gameId: string;
  action: BlackjackAction;
  syncIndex: number;
  buyInsurance?: boolean;
  betToken?: string;
}): Promise<BlackjackApiResponse> {
  return Http.post("/blackjack/submit-action", data);
}
