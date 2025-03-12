import { ChestSpeed } from "#core/types/chests/ChestSpeed";

export function getSpinDuration(speed: ChestSpeed): number {
  switch (speed) {
    case "slow":
      return 4000;
    case "fast":
      return 2500;
    case "turbo":
      return 1000;
  }
}
