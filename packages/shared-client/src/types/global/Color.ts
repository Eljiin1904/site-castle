import type { colors } from "#client/services/style/constants/colors";

declare global {
  type Colors = typeof colors;
  type Color = keyof Colors;
}

export {};
