import { Favorite, MedicalServices, Work } from "@mui/icons-material";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";
import { ReactNode } from "react";
import { Button } from "@mui/material";

export const Entries = ({ entries, diagnoses }: { entries: Entry[], diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.length > 0 && entries.map(entry => <EntryItem key={entry.id} entry={entry} diagnoses={diagnoses} />)}  
      <Button color="primary" variant="contained">ADD NEW ENTRY</Button>
    </div>
  );
};


export const EntryItem = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case ("Hospital"):
      return <HospitalEntryItem entry={entry} diagnoses={diagnoses} />;
    case ("OccupationalHealthcare"):
      return <OccupationalEntryItem entry={entry} diagnoses={diagnoses} />;
    case ("HealthCheck"):
      return <HealthCheckEntryItem entry={entry} diagnoses={diagnoses} />;
    default:
      return null; 
  }
};

const HospitalEntryItem = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {
  console.log("hospital:", entry);

  return (
    <div style={{ border: "1px solid black", padding: "4px", margin: "8px 0 8px 0" }}>
      <p>{entry.date} <MedicalServices /> </p> 
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses?.find(diagnosis => diagnosis.code === code)?.name ?? null}</li>) : null}
      </ul>
      <span>diagnose by {entry.specialist}</span>
    </div> 
  );
};

const OccupationalEntryItem  = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
  console.log("occupational:", entry);

  return (
    <div style={{ border: "1px solid black", padding: "4px", margin: "8px 0 8px 0" }}>
      <p>{entry.date} <Work /></p> 
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses?.find(diagnosis => diagnosis.code === code)?.name ?? null}</li>) : null}
      </ul>
    </div> 
  );
};

const HealthCheckEntryItem  = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
  console.log("health check:", entry);
  let icon: ReactNode;

  switch(entry.healthCheckRating) {
    case 1:
      icon = <Favorite color="success" />;
      break;
    case 2:
      icon = <Favorite color="warning" />;
      break;
    case 3:
      icon = <Favorite color="error" />;
      break;
    default:
      icon = <Favorite />;
      break;
  }

  return (
    <div style={{ border: "1px solid black", padding: "4px", margin: "8px 0 8px 0" }}>
      <p>{entry.date} <MedicalServices /></p>
      <p>{entry.description}</p>
      {icon}
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses?.find(diagnosis => diagnosis.code === code)?.name ?? null}</li>) : null}
      </ul>
      <span>diagnose by {entry.specialist}</span>
    </div> 
  );
};
