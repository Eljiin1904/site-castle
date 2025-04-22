import { Router } from "express";
import validate from "./validate";

const router = Router();

validate(router);

export default router;
