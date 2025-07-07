import { Router } from "express";
import syncHubEightGameList from "./syncHubEightGameList";
import syncGameListStatus from "./syncGameListStatus";
import getHubEightGameListDetails from "./getHubEightGameListDetails";
import getSiteCategoryToggleValues from "./getSiteCategoryToggleValues";
import toggleSiteCategory from "./toggleSiteCategory";
import updateHubEightGameDetails from "./updateHubEightGameDetails";

const router = Router();

getHubEightGameListDetails(router);
getSiteCategoryToggleValues(router);
toggleSiteCategory(router);
getHubEightGameListDetails(router);
syncHubEightGameList(router);
syncGameListStatus(router);
updateHubEightGameDetails(router);

export default router;
