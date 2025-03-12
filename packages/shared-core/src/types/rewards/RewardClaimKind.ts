import type { BasicRace } from "./BasicRace";

export type RewardClaimKind = RewardClaimKindData["kind"];

export type RewardClaimKindData = RacePayoutData | RafflePayoutData;

interface RacePayoutData {
  kind: "race-payout";
  race: BasicRace;
  rank: number;
}

interface RafflePayoutData {
  kind: "raffle-payout";
  raffleId: string;
  round: number;
  ticketId: string;
  ticketIndex: number;
}
