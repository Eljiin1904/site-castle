import { Router } from "express";
import logError from "./logError";
import getSiteStats from "./getSiteStats";
import startSession from "./startSession";

const router = Router();

getSiteStats(router);
logError(router);
startSession(router);

export default router;
