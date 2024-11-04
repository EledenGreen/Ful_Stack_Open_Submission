import express, { Response } from "express";
import { Diagnosis } from "../types";
import diagnoses from "../..//data/diagnoses";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoses);
});

export default router;
