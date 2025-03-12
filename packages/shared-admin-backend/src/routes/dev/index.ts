import { Router } from "express";
import regenAffiliateReports from "./regenAffiliateReports";
import regenTxReports from "./regenTransactionReports";
import regenUserReports from "./regenUserReports";

const router = Router();

regenAffiliateReports(router);
regenTxReports(router);
regenUserReports(router);

export default router;
