import { Router } from "express";
import depositSwapped from "./depositSwapped";
import getTipUsage from "./getTipUsage";
import redeemGiftCard from "./redeemGiftCard";
import redeemPromotion from "./redeemPromotion";
import sendTip from "./sendTip";
import vaultDeposit from "./vaultDeposit";
import vaultWithdraw from "./vaultWithdraw";

const router = Router();

depositSwapped(router);
getTipUsage(router);
redeemGiftCard(router);
redeemPromotion(router);
sendTip(router);
vaultDeposit(router);
vaultWithdraw(router);

export default router;
