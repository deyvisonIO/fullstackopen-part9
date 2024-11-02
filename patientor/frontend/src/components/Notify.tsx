import { Alert } from "@mui/material";

const Notify = ({ notification }: { notification: string }) => {
  if(!notification) return null;

  return (
    <Alert severity="error">{notification}</Alert>
  );
};

export default Notify;
