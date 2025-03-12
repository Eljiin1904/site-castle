import { Numbers } from "#core/services/numbers";
import { ChestDocument } from "#core/types/chests/ChestDocument";
import { createRoll } from "./createRoll";

export function getDemoRoll({
  chest,
  specialEnabled,
}: {
  chest: ChestDocument;
  specialEnabled: boolean;
}) {
  const value = Numbers.randomInt(1, 1000000);
  return createRoll({ chest, specialEnabled, value });
}
