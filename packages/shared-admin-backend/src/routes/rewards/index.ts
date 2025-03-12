import { Router } from "express";
import createBoostEvent from "./createBoostEvent";
import createHoliday from "./createHoliday";
import createProduct from "./createProduct";
import createRace from "./createRace";
import createRaffle from "./createRaffle";
import editBoostEvent from "./editBoostEvent";
import getBoostEvents from "./getBoostEvents";
import getHoliday from "./getHoliday";
import getHolidays from "./getHolidays";
import editProduct from "./editProduct";
import getProducts from "./getProducts";
import getRaces from "./getRaces";
import getRaffle from "./getRaffle";
import getRaffles from "./getRaffles";

const router = Router();

createBoostEvent(router);
createHoliday(router);
createProduct(router);
createRace(router);
createRaffle(router);
editBoostEvent(router);
editProduct(router);
getBoostEvents(router);
getHoliday(router);
getHolidays(router);
getProducts(router);
getRaces(router);
getRaffle(router);
getRaffles(router);

export default router;
