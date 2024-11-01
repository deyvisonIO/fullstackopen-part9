import express, { Response } from "express";
import { Entry, Patient, PatientWithoutSSN } from "../types";
import { addEntry, addPatient, getAllWithoutSSN, getById } from "../services/patientServices";
import { v1 as uuid } from "uuid";
import { parseEntry, parsePatient } from "../guards";
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
    const newPatient = addPatient({ id, ...parsedPatient, entries: [] });
    res.json(newPatient);
  } catch(error) {
    if(error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return;
    }
    res.status(400).send({ error: "Unknown error"});
  }
});

patientRouter.post("/:id/entries", (req, res: Response<Entry | { error: string | z.ZodIssue[] }>) => {
  const id = req.params.id;
  const body = req.body as unknown;

  if(!id || !body || !z.string().parse(id)) {
    res.status(400).send({ error: "malformed parameters" });
    return;
  }

  const patient: Patient | undefined = getById(id);
  if(!patient) {
    res.status(404).send({ error: "patient not found"});
    return;
  }

  try {
    const parsedEntry = parseEntry(body);
    const entryId = uuid();
    const newEntry = addEntry(id, { id: entryId, ...parsedEntry });

    res.json(newEntry);

  } catch(error) {
    if(error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
      return;
    }

    console.log(error);
    res.status(400).send({ error: "Unknown error"});
  }

});

patientRouter.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const id = req.params.id;
  if(!id || !z.string().parse(id)) {
    res.status(400).send({ error: "malformed parameters" });
    return;
  }
  const patient: Patient | undefined = getById(id);

  if(!patient) {
    res.status(404).send({ error: "patient not found"});
    return;
  }

  res.json(patient); 
});


export default patientRouter;
