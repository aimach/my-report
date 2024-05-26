import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./components/header/Header";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { alpha } from "@mui/material";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { fr } from "date-fns/locale/fr";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <CssBaseline />

        <div className="layout">
          <Header />
          <Box
            id="hero"
            sx={(theme) => ({
              width: "100%",
              backgroundImage:
                theme.palette.mode === "light"
                  ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                  : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
              backgroundSize: "100% 20%",
              backgroundRepeat: "no-repeat",
            })}
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
    </>
  );
}

export default App;
