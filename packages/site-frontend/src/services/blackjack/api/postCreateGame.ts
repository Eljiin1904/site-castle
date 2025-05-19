import { Http } from "@client/services/http";
import { BlackjackApiResponse } from "#core/types/blackjack/BlackjackApiResponse";
import { BlackjackBetAmounts } from "#core/types/blackjack/BlackjackBetAmounts";

export default async function ({
  betAmounts,
  betToken,
}: {
  betAmounts: BlackjackBetAmounts;
  betToken?: string;
}): Promise<BlackjackApiResponse> {
  return Http.post("/blackjack/create-game", { betAmounts, betToken });
}
