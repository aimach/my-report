import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import logo from "../assets/img/my-report-logo.svg";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function Header() {
  const navigate = useNavigate();
  let location = useLocation();
  const { connected, logout } = useContext(AuthContext);

  const menuLabels = [
    { title: "Gérer mes comptes rendus", link: "/" },
    { title: "Créer un compte rendu", link: "/visit/new/new" },
    { title: "Statistiques", link: "/dashboard" },
  ];

  return (
    <div>
      <AppBar
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link to="/">
                <img src={logo} style={logoStyle} alt="logo of My Report" />
              </Link>
              {connected && (
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  {menuLabels.map((label, index) => {
                    return (
                      <MenuItem
                        onClick={() => navigate(label.link)}
                        sx={{ py: "6px", px: "12px" }}
                        key={index}
                      >
                        <Typography variant="body2" color="text.primary">
                          {label.title}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {connected && ( // si l'utilisateur est connecté, afficher le bouton "Se déconnecter"
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  href="/login"
                  onClick={logout}
                >
                  Se déconnecter
                </Button>
              )}
              {!connected &&
                location.pathname !== "/login" && ( // si l'utilisateur n'est pas connecté et qu'il n'est pas sur la page login, afficher le bouton "Se connecter"
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    href="/login"
                  >
                    Se connecter
                  </Button>
                )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
