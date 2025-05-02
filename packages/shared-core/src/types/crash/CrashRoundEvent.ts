export interface CrashRoundEvent {
  crashed: boolean;
  multiplierCrash: number;
  timestamp: Date;
  serverSeed: string;
  serverSeedHash: string;
}

// This is the type of the event that is sent to the client when during a round.
// It is used to update the round state in the client and fix client predictions.
// Round tickets will be updated with the latest event if they are not yet processed.