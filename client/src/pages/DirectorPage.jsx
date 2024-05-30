import { useContext, useEffect } from "react";

import { Typography, Container } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { useNavigate, useLoaderData } from "react-router-dom";
import SalesChart from "../components/SalesChart.jsx";

function DirectorPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const chartStats = useLoaderData();
  const series = [];
  chartStats.map((chart) => {
    const { commercialFirstname, commercialLastName } = chart[0];
    const serie = chart.map((item) => ({
      year: item.year,
      data: item.data,
    }));
    series.push({ commercialFirstname, commercialLastName, serie });
  });

  useEffect(() => {
    // on redirige l'utilisateur s'il n'est pas directeur
    if (profile && profile.is_director === false) {
      navigate("/");
    }
  }, [profile]);

  return (
    chartStats && (
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
        <Container maxWidth="xl">
          <SalesChart series={series} />
        </Container>
      </Container>
    )
  );
}

export default DirectorPage;
