import Commercial from "../models/commercial.js";
import Visit from "../models/visit.js";
import mongoose from "mongoose";

const findPopulatedVisitWithSkipAndLimit = async (
  commercialId,
  sort,
  resultNb,
  currentPage
) => {
  return await Visit.find({
    commercial: commercialId,
  })
    .populate([{ path: "commercial" }, { path: "client" }, { path: "article" }])
    .sort(sort.date ? sort : { date: "desc" }) // si la query date existe, on trie en fonction de ce qui est demandé dans les queries, sinon en envoie par de la plus récente à la plus ancienne
    .skip(parseInt(resultNb, 10) * (parseInt(currentPage, 10) - 1))
    .limit(parseInt(resultNb, 10))
    .exec();
};

const getCountVisits = async (commercialId) => {
  return await Visit.countDocuments({
    commercial: commercialId,
  });
};

const getSalesPerCommercial = async (commercial) => {
  const firstVisit = await getFirstVisit();
  const allCommercialSales = [];
  let year = firstVisit[0].year;
  while (year <= new Date().getFullYear()) {
    // tant que la date n'est pas supérieur à actuelle
    let monthNb = 12; // les données sont à récupérée sur 12 mois
    if (year === new Date().getFullYear()) monthNb = new Date().getMonth(); // si c'est lannée en cours, le nombre de mois est égal au mois actuel - 1

    let annualSales = [];
    for (let i = 1; i <= monthNb; i++) {
      // pour chacun des mois de l'année
      const sales = await Visit.aggregate([
        {
          $match: {
            commercial: new mongoose.Types.ObjectId(commercial._id), // on récupère les ventes du commercial en cours
            $expr: {
              $and: [
                { $eq: [{ $month: "$date" }, i] }, // du mois en cours
                { $eq: [{ $year: "$date" }, year] }, // de l'année en cours
              ],
            },
          },
        },
        {
          $group: {
            _id: {
              commercial: { id: commercial._id },
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            salesNb: { $sum: 1 }, // pour chaque mois/année, on compte le nombre de vente
            total: { $sum: "$sales" }, // pour chaque mois/année, on compte le total
          },
        },
      ]);
      annualSales.push(sales[0]);
    }
    allCommercialSales.push({
      commercial_firstname: commercial.firstname,
      commercial_lastname: commercial.lastname,
      year,
      annualSales,
    });
    year++;
  }
  return allCommercialSales;
};

const getAllSales = async () => {
  const allSales = [];
  const commercials = await Commercial.find().exec();
  for (const commercial of commercials) {
    // utilisation de for...of car forEach ne gère pas bien await
    const sales = await getSalesPerCommercial(commercial);
    allSales.push(sales);
  }
  return allSales;
};

const getAllSalesMonthly = async () => {
  const allSales = [];
  const commercials = await Commercial.find().exec();
  for (const commercial of commercials) {
    // utilisation de for...of car forEach ne gère pas bien await
    const [sales] = await getSalesPerCommercial(commercial);
    allSales.push(sales);
  }
  return allSales;
};

const getFirstVisit = async () => {
  return await Visit.aggregate([
    { $sort: { date: 1 } },

    { $limit: 1 },
    {
      $project: {
        _id: 0,
        year: { $year: "$date" }, // Extrait l'année de la date
        month: { $month: "$date" }, // Extrait le mois de la date
      },
    },
  ]);
};

const sortVisits = (sortType, direction, visits) => {
  if (sortType === "client" && direction === "asc") {
    visits.sort((a, b) => {
      if (a.client.lastname < b.client.lastname) return -1;
      if (a.client.lastname > b.client.lastname) return 1;
      return 0;
    });
  } else if (sortType === "client" && direction === "desc") {
    visits.sort((a, b) => {
      if (a.client.lastname > b.client.lastname) return -1;
      if (a.client.lastname < b.client.lastname) return 1;
      return 0;
    });
  }

  if (sortType === "article" && direction === "asc") {
    visits.sort((a, b) => {
      if (a.article.name < b.article.name) return -1;
      if (a.article.name > b.article.name) return 1;
      return 0;
    });
  } else if (sortType === "article" && direction === "desc") {
    visits.sort((a, b) => {
      if (a.article.name > b.article.name) return -1;
      if (a.article.name < b.article.name) return 1;
      return 0;
    });
  }
};

const formatAllSales = (allSalesPerCommercial) => {
  const allCommercialsFormatedSales = []; // le tableau qu'on retourne à la fin
  allSalesPerCommercial.map((commercial) => {
    // pour chaque tableau qui regroupe les ventes annuelles d'un commercial
    const commercialCharts = []; // on créé un tableau pour y stocker toutes les données du commercial
    commercial.forEach((saleYear) => {
      // pour chaque donnée annuelle du commercial
      let dataForChart = []; // on créé un tableau pour y stocker toutes les données annuelle du commercial
      saleYear.annualSales.forEach((monthlySale) => {
        // pour chaque année
        if (monthlySale === undefined) {
          // si la BDD n'a renvoyé aucune donnée
          dataForChart.push(0); // alors on met 0 pour le total de vente
        } else {
          dataForChart.push(monthlySale.total); // sinon, on stocke le total
        }
      });
      commercialCharts.push({
        year: saleYear.year,
        data: dataForChart,
        commercialFirstname: saleYear.commercial_firstname,
        commercialLastName: saleYear.commercial_lastname,
      }); // pour faciliter l'utilisation des données, le tableau est rempli des données formatées pour les graphiques avec l'année, la data à afficher et les informations du commercial
    });
    allCommercialsFormatedSales.push(commercialCharts); // on stocke toutes les données de tous les commerciaux dans un tableau qui sera renvoyé
  });
  return allCommercialsFormatedSales;
};

const getAllSalesForCurrentYear = async () => {
  let annualSales = [];
  for (let i = 1; i <= 12; i++) {
    const [sales] = await Visit.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, i] }, // du mois en cours
              { $eq: [{ $year: "$date" }, new Date().getFullYear()] }, // de l'année en cours
            ],
          },
        },
      },
      {
        $group: {
          _id: i,
          salesNb: { $sum: 1 }, // pour chaque mois/année, on compte le nombre de vente
          total: { $sum: "$sales" }, // pour chaque mois/année, on compte le total
          forecastTotal: { $sum: "$forecast_sales" }, // pour chaque mois/année, on compte le total
        },
      },
    ]);
    annualSales.push(sales);
  }
  return annualSales;
};

export {
  sortVisits,
  findPopulatedVisitWithSkipAndLimit,
  getCountVisits,
  getSalesPerCommercial,
  getAllSales,
  getAllSalesMonthly,
  formatAllSales,
  getAllSalesForCurrentYear,
};
