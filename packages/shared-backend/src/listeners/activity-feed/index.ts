import { Sockets } from "#app/services/sockets";
import initStream from "./initStream";
import onJoin from "./onJoin";
import onLeave from "./onLeave";

const router = Sockets.createRouter(initStream, onJoin, onLeave);

export default router;
