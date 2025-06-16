/**
 * Sends a request to cash out a crash ticket for the active round.
 *
 * @param data - The data required to cash out the ticket.
 * @param data.roundId - The unique identifier of the round for which the ticket is being cashed out.
 * @returns A promise that resolves to an object containing the results of the cashout operation.
 * @throws An error if the HTTP request fails.
 */
import { Http } from "@client/services/http";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export function cashoutTicket(data: {
  roundId: string;
}): Promise<{
  results: CrashTicketDocument;
}> {
  return Http.post("/crash/cashout-ticket", data);
}
