import { Router } from "express";
import getCaseBattleResults from "./getCaseBattleResults";
import getCaseGameResults from "./getCaseGameResults";
import getDiceResults from "./getDiceResults";
import getSeeds from "./getSeeds";
import getDoubleResults from "./getDoubleResults";
import getLimboResults from "./getLimboResults";
import rotateSeeds from "./rotateSeeds";
import getBlackjackResults from "./getBlackjackResults";
import getMinesResults from "./getMinesResults";
import getCrashResults from "./getCrashResults";

const router = Router();

getCaseBattleResults(router);
getCaseGameResults(router);
getDoubleResults(router);
getDiceResults(router);
getLimboResults(router);
getMinesResults(router);
getBlackjackResults(router);
getCrashResults(router);
getSeeds(router);
rotateSeeds(router);

export default router;
