import { EntryWithoutId, Gender, Patient } from "./types";
import { z } from "zod";

const patientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string().date(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string().date(),
  specialist: z.string(),
  diagnosisCodes: z.string().array(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

const occupationalEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.number().nonnegative().max(3),
});

const entrySchema = z.union([
  hospitalEntrySchema,
  occupationalEntrySchema,
  healthCheckEntrySchema,
]);

export function parsePatient(obj: unknown): Omit<Patient, "id" | "entries"> {
  return patientSchema.parse(obj);
}

export function parseEntry(obj: unknown): EntryWithoutId {
  return entrySchema.parse(obj);
}

export function parseDiagnosisCodes(obj: unknown): string[] {
  if (!obj || typeof obj !== "object" || !("diagnosisCodes" in obj)) {
    return [] as string[];
  }

  return obj.diagnosisCodes as string[];
}
