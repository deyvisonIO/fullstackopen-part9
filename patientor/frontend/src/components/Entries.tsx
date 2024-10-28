import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

export const Entries = ({ entries, diagnoses }: { entries: Entry[], diagnoses: Diagnosis[] }) => {
  return (
    <div>
      <h3>entries</h3>
      {entries.length > 0 && entries.map(entry => <EntryItem key={entry.id} entry={entry} diagnoses={diagnoses} />)}  
    </div>
  );
};


export const EntryItem = ({ entry, diagnoses }: { entry: Entry, diagnoses: Diagnosis[] }) => {
  switch (entry.type) {
    case ("Hospital"):
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case ("OccupationalHealthcare"):
      return <OccupationalEntry entry={entry} diagnoses={diagnoses} />;
    case ("HealthCheck"):
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return null; 
  }
};

const HospitalEntry = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: Diagnosis[]  }) => {
  console.log("hospital:", entry);

  return (
    <div>
      <p>{entry.date} {entry.description}</p> 
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses?.find(diagnosis => diagnosis.code === code)?.name ?? null}</li>) : null}
      </ul>
    </div> 
  );
};

const OccupationalEntry = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
  console.log("occupational:", entry);

  return (
    <div>
      <p>{entry.date} {entry.description}</p> 
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses?.find(diagnosis => diagnosis.code === code)?.name ?? null}</li>) : null}
      </ul>
    </div> 
  );
};

const HealthCheckEntry = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
  console.log("health check:", entry);

  return (
    <div>
      <p>{entry.date} {entry.description}</p> 
      <ul>
        {entry.diagnosisCodes ? entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnoses?.find(diagnosis => diagnosis.code === code)?.name ?? null}</li>) : null}
      </ul>
    </div> 
  );
};
