import { Button, FormControl, Input, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../../constants";
import { useParams } from "react-router-dom";
import { Diagnosis } from "../../types";

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

const HealthCheckEntryForm = ({ notify }: { notify: (notification: string) => void }) => {
  const id = useParams().id;
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios
      .get(apiBaseUrl + "/diagnoses/")
      .then((response) => setDiagnoses(response.data))
      .catch((error) => console.log(error));
  }, []);

  function submitHealthCheckEntry(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!description || !date || !specialist || !healthCheckRating) {
      return;
    }

    axios.post(apiBaseUrl + "/patients/" + id + "/entries", {
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes,
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
    <form onSubmit={submitHealthCheckEntry}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="description" required>
          Description
        </InputLabel>
        <Input
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="date" required>
          Date
        </InputLabel>
        <Input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="specialist" required>
          Specialist
        </InputLabel>
        <Input
          id="specialist"
          type="text"
          name="specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="Healthcheck Rating" required>
          Healthcheck Rating
        </InputLabel>
        <Input
          id="Healthcheck Rating"
          type="number"
          name="Healthcheck Rating"
          value={healthCheckRating}
          onChange={(e) => setHealthCheckRating(Number(e.target.value))}
          inputProps={{ min: 0, max: 4 }}
        />
      </FormControl>
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
        </FormControl>
      </div>
      <Button type="submit" variant="contained">Submit</Button>
    </form>
  );
};

export default HealthCheckEntryForm;
