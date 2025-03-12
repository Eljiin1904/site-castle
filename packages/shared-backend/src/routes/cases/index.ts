import { Router } from "express";
import getCase from "./getCase";
import getCases from "./getCases";
import openCases from "./openCases";

const router = Router();

getCase(router);
getCases(router);
openCases(router);

export default router;
