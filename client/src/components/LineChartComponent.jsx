import { Container } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineChartComponent({ annualStats }) {
  const salesNb = [];
  const sum = [];
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
  const months = [
    new Date(2024, 0),
    new Date(2024, 2),
    new Date(2024, 2),
    new Date(2024, 3),
    new Date(2024, 4),
    new Date(2024, 5),
    new Date(2024, 6),
    new Date(2024, 7),
    new Date(2024, 8),
    new Date(2024, 9),
    new Date(2024, 10),
    new Date(2024, 11),
  ];

  annualStats.forEach((stat) => {
    if (stat !== null) {
      salesNb.push(stat.salesNb);
      sum.push(stat.total);
    } else {
      salesNb.push(null);
      sum.push(null);
    }
  });

  const xAxisParams = [
    {
      id: "Years",
      data: months,
      scaleType: "time",
      valueFormatter: (date) => {
        return monthLabel[date.getMonth()];
      },
    },
  ];

  return (
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
            data: salesNb,
            label: "ventes",
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
            data: sum,
            label: "chiffre d'affaires",
          },
        ]}
        width={500}
        height={300}
        xAxis={xAxisParams}
      />
    </Container>
  );
}
