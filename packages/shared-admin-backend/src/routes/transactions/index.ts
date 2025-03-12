import { Router } from "express";
import getTransaction from "./getTransaction";
import getTransactions from "./getTransactions";

const router = Router();

getTransaction(router);
getTransactions(router);

export default router;
