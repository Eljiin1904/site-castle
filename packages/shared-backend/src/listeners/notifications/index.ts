import { Sockets } from "#app/services/sockets";
import initStream from "./initStream";
import onConnection from "./onConnection";

const router = Sockets.createRouter(initStream, onConnection);

export default router;
