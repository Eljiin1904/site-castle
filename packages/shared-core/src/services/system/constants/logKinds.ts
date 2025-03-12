import type { SystemLogKind } from "#core/types/system/SystemLogKind";

const kindMap: Record<SystemLogKind, boolean> = {
  "client-error": true,
  "http-error": true,
  "server-error": true,
  "socket-error": true,
};

export const logKinds = Object.keys(kindMap) as SystemLogKind[];
