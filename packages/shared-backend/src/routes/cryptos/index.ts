import { Router } from "express";
import createWithdraw from "./createWithdraw";
import getDepositAddress from "./getDepositAddress";
import quoteWithdraw from "./quoteWithdraw";
import rotateDepositAddress from "./rotateDepositAddress";

const router = Router();

createWithdraw(router);
getDepositAddress(router);
quoteWithdraw(router);
rotateDepositAddress(router);

export default router;
