import { Alert, AlertTitle, Snackbar } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { ErrorContext } from "../providers/ErrorProvider";
import { useContext } from "react";

const Error = () => {
  const { error, hideError } = useContext(ErrorContext);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={5000}
      open={true}
      onClose={hideError}>
      <Alert
        onClose={hideError}
        icon={<ErrorIcon color="warning" />}
        severity="error"
        sx={{ backgroundColor: "#BB0C05", color: 'white' }}>

        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default Error;