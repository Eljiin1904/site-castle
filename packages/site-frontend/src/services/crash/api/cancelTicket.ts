/**
 * Sends a request to cancel a next round crash ticket for the user.
 *
 * @returns {Promise<{ results: CrashTicketDocument }>} A promise that resolves to an object containing the canceled crash ticket document.
 */
import { Http } from "@client/services/http";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";

export function cancelTicket(): Promise<{
  results: CrashTicketDocument;
}> {
  return Http.post("/crash/cancel-ticket");
}
