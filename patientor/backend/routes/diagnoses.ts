import express, { Response } from "express";
import data from "../diagnoses";
import { Diagnosis } from "../types";
const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.json(data); 
});

export default diagnosesRouter;
