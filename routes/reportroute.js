import express from "express";
import { reportData, reportedData } from "../controllers/report.js";

const reportRouter = express.Router();
reportRouter.post("/reporting", reportData);
reportRouter.post("/reported", reportedData);
// reportRouter.post("/caserecord", caseRecordData);
export default reportRouter;
