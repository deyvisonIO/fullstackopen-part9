import { FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";

const HospitalEntryForm = () => {
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);


  return (
    <form>
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
        <InputLabel htmlFor="diagnosisCodes" required>DiagnosisCodes</InputLabel>
        <Input id="diagnosisCodes" type="text" name="diagnosisCodes" value={diagnosisCodes} onChange={(e) => setDiagnosisCodes(e.target.value)}/>
      </FormControl>
    </form>
  );
};

export default HospitalEntryForm;
