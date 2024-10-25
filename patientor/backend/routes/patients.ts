import express, { Response } from "express";
import { Patient, PatientWithoutSSN } from "../types";
import { addPatient, getAllWithoutSSN } from "../services/patientServices";
import { v1 as uuid } from "uuid";
import { parsePatient } from "../guards";
import { z } from "zod";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res: Response<PatientWithoutSSN[]>) => {
  const nonSensitiveData: PatientWithoutSSN[] = getAllWithoutSSN();
  res.json(nonSensitiveData); 
});

patientRouter.post("/", express.json(), (req, res) => {
  const patient = req.body as Omit<Patient, "id">;
  try {
    const parsedPatient = parsePatient(patient);
    const id = uuid();
    const newPatient = addPatient({ id, ...parsedPatient});
    res.json(newPatient);
  } catch(error) {
    if(error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return;
    }
    res.status(400).send({ error: "Unknown error"});
  }
});

export default patientRouter;
