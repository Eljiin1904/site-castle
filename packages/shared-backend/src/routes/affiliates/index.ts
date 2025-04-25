import { Router } from "express";
import claimCommission from "./claimCommission";
import claimReload from "./claimReload";
import getDashboard from "./getDashboard";
import getReferrals from "./getReferrals";
import getReload from "./getReload";
import getStats from "./getStats";
import setPendingReferral from "./setPendingReferral";
import getCampaigns from "./getCampaigns";
import createCampaign from "./createCampaign";
import claimCampaignCommision from "./claimCampaignCommision";

const router = Router();

claimCommission(router);
claimCampaignCommision(router);
claimReload(router);
getDashboard(router);
getReferrals(router);
getReload(router);
getStats(router);
setPendingReferral(router);
getCampaigns(router);
createCampaign(router);

export default router;
