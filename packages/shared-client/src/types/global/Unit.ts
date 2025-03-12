import type { units } from "#client/services/style/constants/units";

declare global {
  type Unit = (typeof units)[number];
}

export {};
