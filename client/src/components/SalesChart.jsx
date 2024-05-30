import BarChartComponent from "./BarChartComponent";

export default function SalesChart({ series }) {
  const yearNb = series[0].serie.length;
  let components = [];
  for (let i = 0; i < yearNb; i++) {
    const result = [];
    series
      .map((element) => {
        return { ...element, serie: element.serie[i].data };
      })
      .map((serie) => {
        result.push({ data: serie.serie, label: serie.commercialFirstname });
      });

    components.push(
      <BarChartComponent series={series} result={result} index={i} />
    );
  }

  return <>{components.reverse()}</>;
}
