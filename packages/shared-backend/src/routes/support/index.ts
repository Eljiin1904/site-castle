import { Router } from "express";
import getHash from "./getHash";

const router = Router();

getHash(router);

export default router;
