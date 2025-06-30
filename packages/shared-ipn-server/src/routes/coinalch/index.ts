import { Router } from "express";
import webhook from "./webhook";

const router = Router();

webhook(router);

export default router;
