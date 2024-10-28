import { useEffect, useState } from "react";
import { Diagnosis, Patient } from "../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Entries } from "./Entries";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios.get(apiBaseUrl + "/patients/" + id)
      .then(response => setPatient(response.data))
      .catch(error => console.log(error));

    axios.get(apiBaseUrl + "/diagnoses/")
      .then(response => setDiagnoses(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if(!patient || !diagnoses) {
    return <p>loading...</p>;
  }

  console.log(patient);

  return (
    <div>
      <h1>
        {patient.name}
        {patient.gender === "male" && <Male />}
        {patient.gender === "female" && <Female />}
        {patient.gender === "other" && <Transgender />}
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Entries entries={patient.entries} diagnoses={diagnoses}/>
    </div>
  );
};

export default PatientPage;
