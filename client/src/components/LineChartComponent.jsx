import { Container } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineChartComponent({ annualStats }) {
  // les 2 variables suivantes permettent d'afficher les mois sur l'axe horizontal
  const monthLabel = [
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
  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // fonction pour formater les datas à donner aux graphiques
  const formatData = (array, entry) => {
    return array.map((stat) => {
      if (stat !== null && stat._id < new Date().getMonth() + 1) {
        // si l'entrée n'est pas null et que le mois est inférieur au mois en cours (donc pas prévisionnel)
        return stat[`${entry}`];
      } else {
        return null;
      }
    });
  };

  // paramètres de l'axe horizontal
  const xAxisParams = [
    {
      id: "Months",
      data: months,
      valueFormatter: (date) => {
        return monthLabel[date];
      },
    },
  ];

  return (
    annualStats.length && (
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          pb: { xs: 8, sm: 12 },
        }}
      >
        <LineChart
          series={[
            {
              data: formatData(annualStats, "salesNb"),
              label: "Nombre de ventes",
              color: "#e15759",
            },
          ]}
          width={500}
          height={300}
          dataKey="month"
          xAxis={xAxisParams}
        />
        <LineChart
          series={[
            {
              data: formatData(annualStats, "total"),
              label: "Total ventes",
            },
            {
              data: formatData(annualStats, "forecastTotal"),
              label: "Total prévisionnel",
            },
          ]}
          width={500}
          height={300}
          xAxis={xAxisParams}
        />
      </Container>
    )
  );
}
