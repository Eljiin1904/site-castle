import { maskHiddenUser } from "#core/services/blackjack/Blackjack";

export type MaskedUser = ReturnType<typeof maskHiddenUser>;
