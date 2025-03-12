import { Router } from "express";
import createChest from "./createChest";
import disableChest from "./disableChest";
import enableChest from "./enableChest";
import getChest from "./getChest";
import getChests from "./getChests";
import getReports from "./getReports";
import updateChest from "./updateChest";

const router = Router();

createChest(router);
disableChest(router);
enableChest(router);
getChest(router);
getChests(router);
getReports(router);
updateChest(router);

export default router;
