import { Router } from "express";
import cancelPromotion from "./cancelPromotion";
import createGiftBatch from "./createGiftBatch";
import createPromotion from "./createPromotion";
import getGiftBatches from "./getGiftBatches";
import getGiftBatchExport from "./getGiftBatchExport";
import getGiftCard from "./getGiftCard";
import getGiftCards from "./getGiftCards";
import getLoot from "./getLoot";
import getPromotions from "./getPromotions";
import getPromotionTickets from "./getPromotionTickets";

const router = Router();

cancelPromotion(router);
createGiftBatch(router);
createPromotion(router);
getGiftBatches(router);
getGiftBatchExport(router);
getGiftCard(router);
getGiftCards(router);
getLoot(router);
getPromotions(router);
getPromotionTickets(router);

export default router;
