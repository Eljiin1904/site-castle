import { getCards } from "#core/services/blackjack/Blackjack";

export type CardData = ReturnType<typeof getCards>[number];
export type Suit = CardData["suit"];
export type CardValue = CardData["value"];
