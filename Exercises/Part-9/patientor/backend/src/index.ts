import express from "express";
import patientRouter from "./routes/patients";
import diagnosesRouter from "./routes/diagnoses";

const app = express();
app.use(express.json());

const PORT = 3001;

app.use("/api/patients", patientRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
