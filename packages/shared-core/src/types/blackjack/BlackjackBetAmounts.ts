import { getInitBetAmounts } from "#core/services/blackjack/Blackjack";

export type BlackjackBetAmounts = ReturnType<typeof getInitBetAmounts>;
export type BlackjackBetType = keyof BlackjackBetAmounts;
export type BlackjackBetTypeInsurance = BlackjackBetType | "insurance";
