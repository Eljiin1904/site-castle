import { Router } from "express";
import notification from "./notification";

const router = Router();

notification(router);

export default router;
