import BarChartComponent from "./BarChartComponent";

export default function SalesChart({ series }) {
  const yearNb = series[0].serie.length; // on récupère le nombres d'années
  let components = [];
  for (let i = 0; i < yearNb; i++) {
    // pour chaque année, on formatte la donnée pour avoir un objet {data, label} puis on ajout le composant BarChart
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

  return <>{components.reverse()}</>; // o naffiche l'ensemble des composants à la suite
}
