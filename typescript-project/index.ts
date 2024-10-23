import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNaN } from "./utils";


const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.json({ error: "malformatted parameters" });
    return;
  }
  const result = calculateBmi(Number(height), Number(weight));

  res.json({ height: Number(height), weight: Number(weight), result });
});

interface Exercises {
  daily_exercises: number[],
  target: number
}

app.post("/exercises", express.json(), (req, res) => {
  if(!req?.body) {
    res.json({ error: "parameters missing" });
    return;
  }

  const { daily_exercises, target }: Exercises = req.body as Exercises;
  
  if(!daily_exercises || !target || daily_exercises === undefined || target === undefined) {
  	res.json({ error: "parameters missing" });
  	return;
  }

  const allNumbers = daily_exercises.every(exercise => isNotNaN(exercise)) && isNotNaN(target);

  if(!allNumbers) {
  	res.json({ error: "malformatted parameters" });
  	return;
  }

  const result = calculateExercises(daily_exercises, target);

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("server started! on port: ", PORT);
});
