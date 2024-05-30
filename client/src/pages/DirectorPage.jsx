import { useContext, useEffect } from "react";

import { Typography, Container } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { useNavigate, useLoaderData } from "react-router-dom";
import SalesChart from "../components/SalesChart.jsx";
import LineChartComponent from "../components/LineChartComponent.jsx";

function DirectorPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const { commercialStatsPerYer, annualStats } = useLoaderData();
  const series = [];
  commercialStatsPerYer.map((chart) => {
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
        <Typography variant="h6" color="primary">
          Chiffres de l'année
        </Typography>
        {annualStats && <LineChartComponent annualStats={annualStats} />}
        <Typography variant="h6" color="primary">
          Ventes de l'équipe
        </Typography>
        {commercialStatsPerYer && <SalesChart series={series} />}
      </Container>
    </Container>
  );
}

export default DirectorPage;
