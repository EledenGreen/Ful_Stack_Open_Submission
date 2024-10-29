import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!isNaN(height) && !isNaN(weight)) {
    const result = calculateBmi(height, weight);
    res.send({
      weight: weight,
      height: height,
      bmi: result,
    });
  } else {
    res.status(300).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const daily_exercises: number[] = req.body.daily_exercises;

  if (daily_exercises.length < 1) {
    res.status(400).json({ error: "parameters missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedInput = daily_exercises.map((p: any) => {
    const number = Number(p);
    if (isNaN(number)) {
      res.status(400).json({ error: "malformatted parameters" });
    }
    return number;
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const target = Number(req.body.target);

  const result = calculateExercise(parsedInput, target);

  res.status(200).send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
