import { Router } from "express";
import getHubEightGameList from "./getHubEightGameList";
import syncHubEightGameList from "./syncHubEightGameList";
import syncGameListStatus from "./syncGameListStatus";

const router = Router();

getHubEightGameList(router);
syncHubEightGameList(router);
syncGameListStatus(router);

export default router;
