import { Router } from "express";
import getReferrals from "./getReferrals";

const router = Router();

getReferrals(router);

export default router;
