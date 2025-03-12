import { Router } from "express";
import local from "./local";
import logout from "./logout";
import session from "./session";

const router = Router();

local(router);
logout(router);
session(router);

export default router;
