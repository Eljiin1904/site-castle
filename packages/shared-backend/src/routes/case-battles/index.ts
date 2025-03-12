import { Router } from "express";
import addBot from "./addBot";
import createBattle from "./createBattle";
import joinBattle from "./joinBattle";

const router = Router();

addBot(router);
createBattle(router);
joinBattle(router);

export default router;
