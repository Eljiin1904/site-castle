import { Router } from "express";
import claimCommission from "./claimCommission";
import claimReload from "./claimReload";
import getDashboard from "./getDashboard";
import getReferrals from "./getReferrals";
import getReload from "./getReload";
import getStats from "./getStats";
import setPendingReferral from "./setPendingReferral";

const router = Router();

claimCommission(router);
claimReload(router);
getDashboard(router);
getReferrals(router);
getReload(router);
getStats(router);
setPendingReferral(router);

export default router;
