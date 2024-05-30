import { Container } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function LineChartComponent({ annualStats }) {
  const salesNb = [];
  const sum = [];
  const forecastSum = [];
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
      if (stat._id < new Date().getMonth() + 1) {
        salesNb.push(stat.salesNb);
        sum.push(stat.total);
        forecastSum.push(stat.forecastTotal);
      }
    } else {
      salesNb.push(null);
      sum.push(null);
      forecastSum.push(null);
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
            data: sum,
            label: "Total ventes",
          },
          {
            data: forecastSum,
            label: "Total préivisionnel",
          },
        ]}
        width={500}
        height={300}
        xAxis={xAxisParams}
      />
    </Container>
  );
}
