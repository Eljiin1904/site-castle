import { Router } from "express";
import getCaseBattleResults from "./getCaseBattleResults";
import getCaseGameResults from "./getCaseGameResults";
import getDiceResults from "./getDiceResults";
import getSeeds from "./getSeeds";
import getDoubleResults from "./getDoubleResults";
import getLimboResults from "./getLimboResults";
import rotateSeeds from "./rotateSeeds";

const router = Router();

getCaseBattleResults(router);
getCaseGameResults(router);
getDoubleResults(router);
getDiceResults(router);
getLimboResults(router);
getSeeds(router);
rotateSeeds(router);

export default router;
