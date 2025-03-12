import { Router } from "express";
import createDeposit from "./createDeposit";
import createWithdraw from "./createWithdraw";
import getInventory from "./getInventory";
import getMarket from "./getMarket";
import setTradeUrl from "./setTradeUrl";

const router = Router();

createDeposit(router);
createWithdraw(router);
getInventory(router);
getMarket(router);
setTradeUrl(router);

export default router;
