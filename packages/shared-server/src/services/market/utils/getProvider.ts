import { MarketProvider } from "@core/types/market/MarketProvider";
import { HandledError } from "#server/services/errors";
import { managers } from "../constants/managers";

export function getManager(provider: MarketProvider) {
  const match = managers.find((x) => x.name === provider);

  if (!match) {
    throw new HandledError("Invalid provider.");
  }

  return match.manager;
}
