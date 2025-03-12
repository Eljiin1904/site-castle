import { Router } from "express";
import deposit from "./deposit";

const router = Router();

deposit(router);

export default router;
