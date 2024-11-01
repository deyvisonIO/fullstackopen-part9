import patientsData from "../patients";
import { Entry, Patient, PatientWithoutSSN } from "../types";

export function getAll(): Patient[] {
  return patientsData;
}

export function getAllWithoutSSN(): PatientWithoutSSN[] {
  const patientsWithoutSSN: PatientWithoutSSN[] = patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({ id, name, dateOfBirth, gender, occupation }));
  return patientsWithoutSSN;
}

export function getById(id: string): Patient | undefined {
  const patient: Patient | undefined = patientsData.find((patient: Patient) => patient.id === id);
  if(!patient) {
    return undefined;
  }

  return patient;
}


export function getByIdWithoutSSN(id: string): PatientWithoutSSN | undefined {
  const patient: Patient | undefined = patientsData.find((patient: Patient) => patient.id === id);
  if(!patient) {
    return undefined;
  }
  const patientWithoutSSN: PatientWithoutSSN = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    occupation: patient.occupation,
    gender: patient.gender
  };
  return patientWithoutSSN;
}

export function addPatient(newPatient: Patient): Patient {
  patientsData.push(newPatient);
  return newPatient;
}


export function addEntry(patientId: string, newEntry: Entry): Entry {
  const indx = patientsData.findIndex(patient => patient.id === patientId);
  console.log(patientsData[indx]);
  patientsData[indx].entries.push(newEntry);
  return newEntry;
}
