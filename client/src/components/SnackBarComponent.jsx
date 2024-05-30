import { Snackbar, Alert, Slide } from "@mui/material";

export default function SnackBarComponent({ alert, setAlert }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={alert.open}
      autoHideDuration={2000}
      onClose={() => setAlert({ ...alert, open: false })}
      TransitionComponent={Slide}
    >
      <Alert severity={alert.severity} sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
