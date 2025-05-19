import { Sockets } from "#app/services/sockets";
import onJoin from "./onJoin";
import onLeave from "./onLeave";
import initStream from "./initStream";

const router = Sockets.createRouter(onJoin, onLeave, initStream);

export default router;
