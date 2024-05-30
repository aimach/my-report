import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import SalesChart from "../components/SalesChart.jsx";
import LineChartComponent from "../components/LineChartComponent.jsx";
import connexion from "../services/connexion.js";
import { Typography, Container, CircularProgress } from "@mui/material";

function DirectorPage() {
  const { profile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [commercialStatsPerYer, setCommercialStatsPerYer] = useState([]);
  const [annualStats, setAnnualStats] = useState([]);

  useEffect(() => {
    // on redirige l'utilisateur s'il n'est pas directeur
    if (profile && profile.is_director === false) {
      navigate("/");
    }
  }, [profile]);

  useEffect(() => {
    // on récupère les données pour afficher le graphique à barres et  on les stocke dans le state commercialStatsPerYer
    const getCommercialStatsPerYer = async () => {
      try {
        const response = await connexion.get(`/visits/stat?type=monthly`);
        if (response.status === 200) {
          const newSeries = [];
          response.data.forEach((chart) => {
            // on formatte la donnée pour avoir dans le tableau une seule entrée par commercial
            const { commercialFirstname, commercialLastName } = chart[0];
            const serie = chart.map((item) => ({
              year: item.year,
              data: item.data,
            }));
            newSeries.push({ commercialFirstname, commercialLastName, serie });
          });
          setCommercialStatsPerYer(newSeries);
        }
      } catch (error) {
        console.error(error);
      }
    };
    // on récupère les données pour afficher les graphiques à points et on les stocke dans le state annualStates
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
      {commercialStatsPerYer.length && annualStats.length ? ( // si la donnée est accessible, on affiche les graphiques (sinon on affiche un loader)
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
        <CircularProgress />
      )}
    </Container>
  );
}

export default DirectorPage;
