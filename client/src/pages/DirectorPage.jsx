import { useContext, useEffect, useState } from "react";

import { Typography, Container } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import SalesChart from "../components/SalesChart.jsx";
import LineChartComponent from "../components/LineChartComponent.jsx";
import connexion from "../services/connexion.js";

function DirectorPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [commercialStatsPerYer, setCommercialStatsPerYer] = useState([]);
  const [annualStats, setAnnualStats] = useState([]);

  const series = [];

  useEffect(() => {
    // on redirige l'utilisateur s'il n'est pas directeur
    if (profile && profile.is_director === false) {
      navigate("/");
    }
  }, [profile]);

  useEffect(() => {
    const getCommercialStatsPerYer = async () => {
      try {
        const response = await connexion.get(`/visits/stat?type=monthly`);
        if (response.status === 200) {
          response.data.forEach((chart) => {
            const { commercialFirstname, commercialLastName } = chart[0];
            const serie = chart.map((item) => ({
              year: item.year,
              data: item.data,
            }));
            series.push({ commercialFirstname, commercialLastName, serie });
          });
          setCommercialStatsPerYer(series);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getAnnualStats = async () => {
      try {
        const response = await connexion.get(`/visits/stat?type=all`);
        if (response.status === 200) setAnnualStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCommercialStatsPerYer();
    getAnnualStats();
  }, []);

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
        Statistiques
      </Typography>
      {commercialStatsPerYer.length && annualStats.length ? (
        <Container maxWidth="xl">
          {annualStats && (
            <>
              <Typography variant="h6" color="primary">
                Chiffres de l&apos;année
              </Typography>
              <LineChartComponent annualStats={annualStats} />
            </>
          )}
          {commercialStatsPerYer && (
            <>
              <Typography variant="h6" color="primary">
                Ventes de l&apos;équipe
              </Typography>
              <SalesChart series={commercialStatsPerYer} />
            </>
          )}
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default DirectorPage;
