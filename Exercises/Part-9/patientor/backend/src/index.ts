import express, { Response } from "express";
import { Diagnosis } from "./types";
import diagnoses from "../data/diagnoses";

const app = express();
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/diagnoses", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoses);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
