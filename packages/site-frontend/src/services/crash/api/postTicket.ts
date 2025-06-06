import { Http } from "@client/services/http";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

/**
 * Sends a request to create a crash ticket for the current or next round.
 *
 * @param data - The ticket data to be posted.
 * @param data.roundId - The unique identifier for the round.
 * @param data.betAmount - The amount of the bet placed.
 * @param data.betToken - (Optional) The token used for the bet.
 * @param data.targetMultiplier - (Optional) The target multiplier for the bet.
 * @param data.nextRound - (Optional) Indicates whether the ticket is for the next round.
 * @returns A promise that resolves to an object containing the results of the posted ticket.
 */
export function postTicket(data: {
  roundId: string;
  betAmount: number;
  betToken?: string;
  targetMultiplier?: number;
  nextRound?: boolean;
}): Promise<{
  results: CrashTicketDocument;
}> {
  return Http.post("/crash/post-ticket", data);
}
