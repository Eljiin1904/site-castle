import { Sockets } from "#app/services/sockets";
import initMeta from "./initMeta";
import initSettings from "./initSettings";
import initTime from "./initTime";
import onConnection from "./onConnection";

const router = Sockets.createRouter(
  initMeta,
  initSettings,
  initTime,
  onConnection,
);

export default router;
