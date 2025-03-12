import { Router } from "express";
import boost from "./boost";
import buyProduct from "./buyProduct";
import claim from "./claim";
import getActiveRace from "./getActiveRace";
import getAdventInfo from "./getAdventInfo";
import getBoostDates from "./getBoostDates";
import getClaims from "./getClaims";
import getGemCase from "./getGemCase";
import getHolidayCase from "./getHolidayCase";
import getLevelCase from "./getLevelCase";
import getLevelCases from "./getLevelCases";
import getProducts from "./getProducts";
import openAdvent from "./openAdvent";
import openGemCases from "./openGemCases";
import openHolidayCases from "./openHolidayCases";
import openLevelCases from "./openLevelCases";

const router = Router();

boost(router);
buyProduct(router);
claim(router);
getActiveRace(router);
getAdventInfo(router);
getBoostDates(router);
getClaims(router);
getGemCase(router);
getHolidayCase(router);
getLevelCase(router);
getLevelCases(router);
getProducts(router);
openAdvent(router);
openGemCases(router);
openHolidayCases(router);
openLevelCases(router);

export default router;
