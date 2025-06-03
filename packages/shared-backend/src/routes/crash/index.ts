import { Router } from "express";
import postTicket from "./postTicket";
import cashoutTicket from "./cashoutTicket";
import cancelTicket from "./cancelTicket";

const router = Router();

postTicket(router);
cashoutTicket(router);
cancelTicket(router);

export default router;
