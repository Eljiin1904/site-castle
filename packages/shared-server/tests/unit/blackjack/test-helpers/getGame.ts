import { Game } from "#server/services/blackjack/models/Game";
import { getBetAmounts } from "./getBetAmounts";
import { getRandomCardIndex } from "./getRandomCardIndex";
import { userId } from "./testConfig";

export function getGame(betAmount: number) {
  return new Game(
    {
      _id: "foo",
      players: [
        {
          userId,
          betAmounts: getBetAmounts(betAmount),
        },
      ],
      seeds: {
        serverSeed: "foo",
        serverSeedHashed: "foo-hashed",
        clientSeed: "bar",
        nonce: 0,
      },
    },
    {
      getRandomCardIndex,
    },
  );
}
