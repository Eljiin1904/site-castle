import { BaseServer } from "#server/types/sockets/BaseServer";

export function createRouter(...args: ((server: BaseServer) => void)[]) {
  return (server: BaseServer) => {
    for (const route of args) {
      route(server);
    }
  };
}
