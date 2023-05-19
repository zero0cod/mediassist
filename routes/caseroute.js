import express from "express";
import { caseData, caseRecordData } from "../controllers/caseController.js";

const caserouter = express.Router();
caserouter.post("/caseupload", caseData);
caserouter.post("/caserecord", caseRecordData);
export default caserouter;
