import { Sockets } from "#app/services/sockets";
import initRace from "./initRace";
import initRaffle from "./initRaffle";
import onJoin from "./onJoin";
import onLeave from "./onLeave";

const router = Sockets.createRouter(initRace, initRaffle, onJoin, onLeave);

export default router;
