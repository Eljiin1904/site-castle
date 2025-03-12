import { Router } from "express";
import getAdminLog from "./getAdminLog";
import getSystemLog from "./getSystemLog";

const router = Router();

getAdminLog(router);
getSystemLog(router);

export default router;
