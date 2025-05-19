import { Router } from "express";
import routeExistingGame from "./routeExistingGame";
import routeCreateGame from "./routeCreateGame";
import routeSubmitAction from "./routeSubmitAction";
import routeMockCards from "./routeMockCards";

const router = Router();

routeExistingGame(router);
routeCreateGame(router);
routeSubmitAction(router);
routeMockCards(router);

export default router;
