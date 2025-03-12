import { Sockets } from "#app/services/sockets";
import initStream from "./initStream";

const router = Sockets.createRouter(initStream);

export default router;
