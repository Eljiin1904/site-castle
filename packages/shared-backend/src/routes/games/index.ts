import { Router } from "express";
import getGames from "./getGames";

const router = Router();

getGames(router);

export default router;
