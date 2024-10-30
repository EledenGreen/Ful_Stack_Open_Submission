import express from "express";
import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";
import cors from "cors";

const app = express();
// eslint-disable-next-line
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
