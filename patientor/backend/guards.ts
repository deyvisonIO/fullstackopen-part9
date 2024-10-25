import { Gender, Patient } from "./types";
import { z } from "zod";

const patientSchema = z.object({
      name: z.string(),
      dateOfBirth: z.string().date(),
      ssn: z.string(),
      gender: z.nativeEnum(Gender),
      occupation: z.string()
});


export function parsePatient(obj: unknown): Omit<Patient, "id"> {
  return patientSchema.parse(obj);
}

