import { Router } from "express";
import getSumsubToken from "./getSumsubToken";

const router = Router();

getSumsubToken(router);

export default router;