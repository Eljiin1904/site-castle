import { Chests } from "#core/services/chests";

export function getSpinDuration() {
  return Chests.getSpinDuration("fast");
}
