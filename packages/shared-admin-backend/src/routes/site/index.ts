import { Router } from "express";
import editSetting from "./editSetting";
import getReports from "./getReport";
import getSettings from "./getSettings";

const router = Router();

editSetting(router);
getReports(router);
getSettings(router);

export default router;
