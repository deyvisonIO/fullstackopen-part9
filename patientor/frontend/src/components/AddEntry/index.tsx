import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import Notify from "../Notify";

const AddEntry = () => {
  const [value, setValue] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const notify = (notification: string) => {
    setNotification(notification);
    setTimeout(() => setNotification(""), 5000);
  };

  return (
    <>
      <Notify notification={notification} />
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Hospital" />
          <Tab label="Occupational" />
          <Tab label="HealthCheck" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <HospitalEntryForm notify={notify}/> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <OccupationalEntryForm notify={notify} /> 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <HealthCheckEntryForm notify={notify} /> 
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
