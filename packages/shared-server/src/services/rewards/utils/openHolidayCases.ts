import { ChestDocument } from "@core/types/chests/ChestDocument";
import { UserDocument } from "@core/types/users/UserDocument";
import { ChestGameDocument } from "@core/types/chests/ChestGameDocument";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Chests } from "#server/services/chests";
import { spendHoliday } from "./spendHoliday";

export async function openHolidayCases({
  user,
  chest,
  openCount,
  holidayCost,
  speed,
  specialEnabled,
}: {
  user: UserDocument;
  chest: ChestDocument;
  openCount: number;
  holidayCost: number;
  speed: ChestSpeed;
  specialEnabled: boolean;
}) {
  const games: ChestGameDocument[] = [];

  for (let i = 0; i < openCount; i++) {
    await spendHoliday({ user, amount: holidayCost });

    const game = await Chests.createGame({
      user,
      chest,
      speed,
      specialEnabled,
    });

    games.push(game);
  }

  return games;
}
