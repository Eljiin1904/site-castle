import { Router } from "express";
import approveWithdraw from "./approveWithdraw";
import cancelWithdraw from "./cancelWithdraw";
import getProviders from "./getProviders";
import getWithdraws from "./getWithdraws";

const router = Router();

approveWithdraw(router);
cancelWithdraw(router);
getProviders(router);
getWithdraws(router);

export default router;
