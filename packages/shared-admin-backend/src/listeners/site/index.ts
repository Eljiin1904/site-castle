import { Sockets } from "#app/services/sockets";
import initMeta from "./initMeta";
import initSettings from "./initSettings";
import onConnection from "./onConnection";

const router = Sockets.createRouter(initMeta, initSettings, onConnection);

export default router;
