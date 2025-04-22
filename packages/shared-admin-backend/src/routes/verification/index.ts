import { Router } from "express";
import getSumsubApplicantData from "./getSumsubApplicantData";
import updateSumsubApplicantData from "./updateSumsubApplicantData";

const router = Router();

getSumsubApplicantData(router);
updateSumsubApplicantData(router);

export default router;
