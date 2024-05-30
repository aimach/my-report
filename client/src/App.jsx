import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import { fr } from "date-fns/locale/fr";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <CssBaseline />
        <div className="layout">
          <Header />
          <Box
            id="hero"
            sx={{
              width: "100%",
              backgroundImage: "linear-gradient(180deg, #CEE5FD, #FFF)",
              backgroundSize: "100% 20%",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },
              }}
            >
              <Outlet />
            </Container>
          </Box>
        </div>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
