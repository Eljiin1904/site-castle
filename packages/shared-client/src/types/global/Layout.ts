import type { layouts } from "#client/services/style/constants/layouts";

declare global {
  type Layout = (typeof layouts)[number];
}

export {};
