import { Router } from "express";
import logError from "./logError";

const router = Router();

logError(router);

export default router;
