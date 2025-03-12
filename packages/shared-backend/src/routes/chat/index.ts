import { Router } from "express";
import getRainPayouts from "./getRainPayouts";
import getUsernames from "./getUsernames";
import sendMessage from "./sendMessage";
import moderate from "./moderate";
import joinRain from "./joinRain";
import tipRain from "./tipRain";

const router = Router();

getRainPayouts(router);
getUsernames(router);
joinRain(router);
moderate(router);
sendMessage(router);
tipRain(router);

export default router;
