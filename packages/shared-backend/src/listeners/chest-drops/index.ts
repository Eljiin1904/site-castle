import { Sockets } from "#app/services/sockets";
import onJoin from "./onJoin";
import onLeave from "./onLeave";

const router = Sockets.createRouter(onJoin, onLeave);

export default router;
