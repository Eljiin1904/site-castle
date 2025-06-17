import { Router } from "express";
import getUserInfo from "./getUserInfo";
import getUserBalance from "./getUserBalance";
import userBalanceBet from "./userBalanceBet";
import userBalanceWin from "./userBalanceWin";
import userBalanceRollback from "./userBalanceRollback";
import getGameList from "./getGameList";
import getGameRound from "./getGameRound";
import getGameURL from "./getGameURL";
import testSetToken from "./testSetToken";

const router = Router();

getUserInfo(router);
getUserBalance(router);
userBalanceBet(router);
userBalanceWin(router);
userBalanceRollback(router);
getGameURL(router);
getGameRound(router);
getGameList(router);
testSetToken(router);

export default router;
