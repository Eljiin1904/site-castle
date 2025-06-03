import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserLocation } from "@core/types/users/UserLocation";
import { Chests } from "#server/services/chests";
import { Transactions } from "#server/services/transactions";
import { addToCasesOpened } from "./addToCasesOpened";

export async function createBets({
  chest,
  user,
  openCount,
  speed,
  specialEnabled,
  location,
}: {
  chest: ChestDocument;
  user: UserDocument;
  openCount: number;
  speed: ChestSpeed;
  specialEnabled: boolean;
  location: UserLocation;
}) {
  const games: ChestGameDocument[] = [];

  for (let i = 0; i < openCount; i++) {
    const gameId = await Chests.getGameId();

    await Transactions.createBet({
      user,
      kind: "case-spin",
      edgeRate: chest.edgeRate,
      betAmount: chest.openCost,
      location,
      gameId,
      chest: Chests.getBasicChest(chest),
    });

    const game = await Chests.createGame({
      gameId,
      user,
      chest,
      speed,
      specialEnabled,
    });

    games.push(game);
  }

  await addToCasesOpened({
    chests: [{ ...chest, count: openCount }],
    user,
  });

  return games;
}
