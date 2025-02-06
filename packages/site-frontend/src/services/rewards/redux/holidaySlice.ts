import { createSlice } from "@reduxjs/toolkit";
import { HolidayInitialState } from "@core/types/rewards/HolidayInitialState";
import { HolidayEvent } from "@core/types/rewards/HolidayEventDocument";
import { RaceState } from "@core/types/rewards/RaceState";
import { RaffleState } from "@core/types/rewards/RaffleState";
import { AdventTicketDocument } from "@core/types/rewards/AdventTicketDocument";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";

interface HolidayState {
  initialized?: boolean;
  event: HolidayEvent;
  race: RaceState;
  raffles: RaffleState[];
  adventTickets: AdventTicketDocument[];
  processing?: boolean;
}

const initialState: HolidayState = {
  event: {} as HolidayEvent,
  race: {} as RaceState,
  raffles: [],
  adventTickets: [],
};

export const holidaySlice = createSlice({
  name: "holiday",
  initialState,
  reducers: ({ reducer }) => ({
    initState: reducer<HolidayInitialState>((state, { payload }) => ({
      ...payload,
      initialized: true,
    })),
    resetState: reducer(() => ({
      ...initialState,
    })),
    setProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    addAdventTicket: reducer<AdventTicketDocument>((state, { payload }) => {
      const tickets = state.adventTickets.slice();

      tickets.push(payload);

      state.adventTickets = tickets;
    }),
    updateRace: reducer<StreamUpdate>((state, { payload }) => {
      Database.updateDocument({
        document: state.race,
        removedFields: payload.removedFields,
        updatedFields: payload.updatedFields,
      });
    }),
    updateRaffle: reducer<StreamUpdate>((state, { payload }) => {
      const raffle = state.raffles.find((x) => x._id === payload.documentId);

      if (raffle) {
        Database.updateDocument({
          document: raffle,
          removedFields: payload.removedFields,
          updatedFields: payload.updatedFields,
        });
      }
    }),
  }),
});

export const { initState, resetState, setProcessing, addAdventTicket, updateRace, updateRaffle } =
  holidaySlice.actions;
