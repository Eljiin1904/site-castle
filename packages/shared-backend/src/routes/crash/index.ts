import { Router } from "express";
import postTicket from "./postTicket";
import cashoutTicket from "./cashoutTicket";

const router = Router();

postTicket(router);
cashoutTicket(router);

export default router;
