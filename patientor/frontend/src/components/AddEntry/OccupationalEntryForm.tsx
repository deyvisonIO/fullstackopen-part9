import { Button, FormControl, FormLabel, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../constants";
import { Diagnosis } from "../../types";
import { useParams } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const OccupationalEntryForm = ({ notify }: { notify: (notification: string) => void }) => {
  const id = useParams().id;
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [employer, setEmployer] = useState<string>("");
  const [sickLeaveStart, setSickLeaveStart] = useState<string>("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios
      .get(apiBaseUrl + "/diagnoses/")
      .then((response) => setDiagnoses(response.data))
      .catch((error) => console.log(error));
  }, []);

  function submitOccupationalEntry(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!description || !date || !specialist || !employer) {
      return;
    }

    axios.post(apiBaseUrl + "/patients/" + id + "/entries", {
      type: "OccupationalHealthcare",
      description,
      date,
      specialist,
      employerName: employer,
      diagnosisCodes,
      sickLeave: {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      } 
    }).catch(response => response?.data?.error ? notify(response.data.error) : notify(response.response.data.error[0].message));
  }

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <form onSubmit={submitOccupationalEntry}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="description" required>Description</InputLabel>
        <Input id="description" type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </FormControl>
      <FormControl fullWidth margin="normal" >
        <InputLabel htmlFor="date" required>Date</InputLabel>
        <Input id="date" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </FormControl>
      <FormControl fullWidth margin="normal" >
        <InputLabel htmlFor="specialist" required>Specialist</InputLabel>
        <Input id="specialist" type="text" name="specialist" value={specialist} onChange={(e) => setSpecialist(e.target.value)}/>
      </FormControl>
      <FormControl fullWidth margin="normal" >
        <InputLabel htmlFor="employer" required>employer</InputLabel>
        <Input id="employer" type="text" name="employer" value={employer} onChange={(e) => setEmployer(e.target.value)}/>
      </FormControl>
      <div>
        <FormLabel component="legend">SickLeave</FormLabel>
        <FormControl>
          <InputLabel htmlFor="sickLeaveStart" required>start</InputLabel>
          <Input id="sickLeaveStart" type="date" name="sickLeaveStart" value={sickLeaveStart} onChange={(e) => setSickLeaveStart(e.target.value)}/>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="sickLeaveEnd" required>end</InputLabel>
          <Input id="sickLeaveEnd" type="date" name="sickLeaveEnd" value={sickLeaveEnd} onChange={(e) => setSickLeaveEnd(e.target.value)}/>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosisCodes"
            id="diagnosisCodes"
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            input={<OutlinedInput label="Diagnosis Codes" />}
            MenuProps={MenuProps}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem
                key={diagnosis.code}
                value={diagnosis.code}
              >
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
          <Button type="submit" variant="contained">Submit</Button>
        </FormControl>
      </div>
    </form>
  );
};

export default OccupationalEntryForm;
