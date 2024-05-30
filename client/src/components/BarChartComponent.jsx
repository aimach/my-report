import { BarChart } from "@mui/x-charts/BarChart";
import { Container, Typography } from "@mui/material";

export default function BarChartComponent({ series, result, index }) {
  const monthLabels = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Typography variant="h5">Année {series[0].serie[index].year}</Typography>
      <BarChart
        series={result}
        height={300}
        grid={{ horizontal: true }}
        borderRadius={7}
        xAxis={[
          {
            data: monthLabels,
            scaleType: "band",
          },
        ]}
        yAxis={[
          {
            label: "montant (€)",
          },
        ]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </Container>
  );
}
