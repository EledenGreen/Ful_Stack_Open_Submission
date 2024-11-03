import express, { Request, NextFunction, Response } from "express";
import {
  EntryWithoutId,
  NewPatientEntry,
  Patient,
  PatientSecure,
} from "../types";
import patientService from "../services/patientService";
import { EntrySchemas, NewEntrySchema } from "../utils";
import { z } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientSecure[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get("/:id", (req, res: Response<Patient | undefined>) => {
  const result = patientService.getPatientById(req.params.id);
  res.send(result);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

interface Params {
  id: string;
}

const newEntryParser = (
  req: Request<Params>,
  _res: Response,
  next: NextFunction
) => {
  try {
    EntrySchemas.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/:id/entries",
  newEntryParser,
  (req: Request<Params, unknown, EntryWithoutId>, res: Response<Patient>) => {
    const patientId = req.params.id;
    const result = patientService.addEntry(req.body, patientId);
    res.json(result);
  }
);

router.use(errorMiddleware);

export default router;
