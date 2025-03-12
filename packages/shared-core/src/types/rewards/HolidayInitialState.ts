import type { AdventTicketDocument } from "./AdventTicketDocument";
import type { HolidayEvent } from "./HolidayEventDocument";
import type { RaceState } from "./RaceState";
import type { RaffleState } from "./RaffleState";

export interface HolidayInitialState {
  event: HolidayEvent;
  race: RaceState;
  raffles: RaffleState[];
  adventTickets: AdventTicketDocument[];
}
