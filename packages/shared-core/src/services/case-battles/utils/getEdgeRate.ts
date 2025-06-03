import { Numbers } from "#core/services/numbers";
import { ChestWithCount } from "#core/types/chests/ChestDocument";

export function getEdgeRate({ chests }: { chests: ChestWithCount[] }) {
  let entryCost = 0;
  let ev = 0;

  for (const chest of chests) {
    entryCost += chest.openCost * chest.count;
    ev += chest.openCost * chest.edgeRate * chest.count;
  }

  return Numbers.round(ev / entryCost, 5);
}
