import { BaseSocket } from "#server/types/sockets/BaseSocket";

export function createHandler<T = BaseSocket>(
  callback: (socket: T, next: (err?: Error) => void) => void | Promise<void>,
) {
  return async (socket: T, next: (err?: Error) => void) => {
    try {
      await callback(socket, next);
    } catch (err) {
      next(err instanceof Error ? err : new Error("Unknown error."));
    }
  };
}
