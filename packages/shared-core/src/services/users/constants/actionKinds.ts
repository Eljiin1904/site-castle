import { UserActionKind } from "#core/types/users/UserActionKind";

const kindMap: Record<UserActionKind, boolean> = {
  "confirm-exclusion": true,
  "email-edit": true,
  "extend-exclusion": true,
  login: true,
  "password-edit": true,
  "password-recover": true,
  register: true,
  "set-trade-url": true,
  "tfa-disable": true,
  "tfa-enable": true,
};

export const actionKinds = Object.keys(kindMap) as UserActionKind[];
