import patientsData from "../patients";
import { Patient, PatientWithoutSSN } from "../types";

export function getAll(): Patient[] {
  return patientsData;
}

export function getAllWithoutSSN(): PatientWithoutSSN[] {
  const patientsWithoutSSN: PatientWithoutSSN[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation }));
  return patientsWithoutSSN;
}

export function addPatient(newPatient: Patient): Patient {
  patientsData.push(newPatient);
  return newPatient;
}
