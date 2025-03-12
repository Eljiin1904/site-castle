import { Router } from "express";
import approveWithdraw from "./approveWithdraw";
import cancelWithdraw from "./cancelWithdraw";
import confirmDeposit from "./confirmDeposit";
import getGasStationAssets from "./getGasStationAssets";
import getHotWalletAssets from "./getHotWalletAssets";
import getWithdraws from "./getWithdraws";
import resendWebhooks from "./resendWebhooks";
import sweepVaults from "./sweepVaults";

const router = Router();

approveWithdraw(router);
cancelWithdraw(router);
confirmDeposit(router);
getGasStationAssets(router);
getHotWalletAssets(router);
getWithdraws(router);
resendWebhooks(router);
sweepVaults(router);

export default router;
