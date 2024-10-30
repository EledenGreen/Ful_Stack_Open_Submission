import express, { Response } from "express";
import { PatientSecure } from "../types";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<PatientSecure[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);

    const addeedEntry = patientService.addPatient(newPatient);
    res.json(addeedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
