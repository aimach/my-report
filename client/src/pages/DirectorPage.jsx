import { useContext, useEffect, useState } from "react";
import { deleteVisit, getAllVisitsWithCommercialId } from "../services/visits";
import connexion from "../services/connexion";

import { TableSortLabel, Typography, Container } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

function DirectorPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // on redirige l'utilisateur s'il n'est pas directeur
    if (profile && profile.is_director === false) {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
          pb: { xs: 8, sm: 8 },
          fontWeight: 500,
        }}
        color="primary"
      >
        Dashboard
      </Typography>
    </Container>
  );
}

export default DirectorPage;
