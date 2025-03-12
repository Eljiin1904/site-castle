import { Router } from "express";
import callback from "./callback";

const router = Router();

callback(router);

export default router;
