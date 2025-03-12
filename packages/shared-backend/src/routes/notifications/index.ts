import { Router } from "express";
import deleteNotification from "./deleteNotification";

const router = Router();

deleteNotification(router);

export default router;