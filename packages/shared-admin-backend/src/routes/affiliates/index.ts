import { Router } from "express";
import createReload from "./createReload";
import createKey from "./createKey";
import disableKey from "./disableKey";
import editReload from "./editReload";
import getAffiliates from "./getAffiliates";
import getReferrals from "./getReferrals";
import getKeys from "./getKeys";
import getReloads from "./getReloads";
import setBaseTier from "./setBaseTier";

const router = Router();

createReload(router);
createKey(router);
disableKey(router);
editReload(router);
getAffiliates(router);
getReferrals(router);
getKeys(router);
getReloads(router);
setBaseTier(router);

export default router;
