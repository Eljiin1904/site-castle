import { Router } from "express";
import postTicket from "./postTicket";

const router = Router();

postTicket(router);

export default router;
