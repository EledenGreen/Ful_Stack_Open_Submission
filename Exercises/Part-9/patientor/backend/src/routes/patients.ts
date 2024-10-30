import express, { Response } from "express";
import { PatientSecure } from "../types";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res: Response<PatientSecure[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;
