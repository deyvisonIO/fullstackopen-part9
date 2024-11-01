import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm";

const AddEntry = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Hospital" />
          <Tab label="Occupational" />
          <Tab label="HealthCheck" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HospitalEntryForm /> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OccupationalEntryForm /> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <HealthCheckEntryForm /> 
      </CustomTabPanel>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export default AddEntry;
