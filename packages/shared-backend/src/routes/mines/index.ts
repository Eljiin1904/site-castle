import { Router } from "express";
import cashout from "./cashout";
import createAutoGame from "./createAutoGame";
import createManualGame from "./createManualGame";
import revealTile from "./revealTile";

const router = Router();

cashout(router);
createAutoGame(router);
createManualGame(router);
revealTile(router);

export default router;
