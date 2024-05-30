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
    .populate([{ path: "commercial" }, { path: "client" }, { path: "article" }]) // on peut le résultat avec les données du commercial, client et article
    .sort(sort.date ? sort : { date: "desc" }) // si la query date existe, on trie en fonction de ce qui est demandé dans les queries, par défaut en envoie de la plus récente à la plus ancienne
    .skip(parseInt(resultNb, 10) * (parseInt(currentPage, 10) - 1)) // pour la pagination
    .limit(parseInt(resultNb, 10)) // pour la pagination
    .exec();
};

const getCountVisits = async (commercialId) => {
  return await Visit.countDocuments({
    commercial: commercialId,
  });
};

const getSalesPerCommercial = async (commercial) => {
  const firstVisit = await getFirstVisit(); // on récupère la date de la première visite
  const allCommercialSales = [];
  let year = firstVisit[0].year; // l'année de départ est celle de la première visite
  while (year <= new Date().getFullYear()) {
    // tant que l'année n'est pas supérieure à l'année actuelle
    let monthNb = 12; // on récupère les données sur 12 mois par défaut
    if (year === new Date().getFullYear()) monthNb = new Date().getMonth(); // si c'est l'année en cours, le nombre de mois est égal au mois actuel - 1 (car getMonth() commence à 0)

    let annualSales = [];
    for (let i = 1; i <= monthNb; i++) {
      // pour chacun des mois de l'année
      const sales = await Visit.aggregate([
        {
          $match: {
            commercial: new mongoose.Types.ObjectId(commercial._id), // on récupère les ventes du commercial donné
            $expr: {
              $and: [
                { $eq: [{ $month: "$date" }, i] }, // du mois donné
                { $eq: [{ $year: "$date" }, year] }, // de l'année donné
              ],
            },
          },
        },
        {
          $group: {
            // on regroupe les résultats
            _id: {
              commercial: { id: commercial._id },
              year: { $year: "$date" },
              month: { $month: "$date" },
            },
            salesNb: { $sum: 1 }, // pour chaque mois/année, on compte le nombre de ventes
            total: { $sum: "$sales" }, // pour chaque mois/année, on compte le total du CA
          },
        },
      ]);
      annualSales.push(sales[0]); // on stocke les données mensuelles dans un tableau
    }
    allCommercialSales.push({
      // le tableau allCommercialSales contiendra, pour chaque année, une entrée avec le nom et prénom du commercial, l'année et le tableau des données mensuelles
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
  const commercials = await Commercial.find().exec(); // on récupère tous les commerciaux
  for (const commercial of commercials) {
    // utilisation de for...of car forEach ne gère pas bien await
    // pour chacun des commerciaux, on va chercher les chiffres de ses ventes annuelles (avec détail mensuel)
    const sales = await getSalesPerCommercial(commercial);
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
        year: { $year: "$date" },
        month: { $month: "$date" },
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
    const commercialCharts = [];
    commercial.forEach((saleYear) => {
      // pour chaque donnée annuelle du commercial
      let dataForChart = [];
      saleYear.annualSales.forEach((monthlySale) => {
        // pour chaque année
        if (monthlySale === undefined) {
          // si la BDD n'a renvoyé aucune donnée
          dataForChart.push(0); // alors on met 0 pour le total de vente
        } else {
          dataForChart.push(monthlySale.total); // sinon, on stocke le total mensuel
        }
      });
      commercialCharts.push({
        year: saleYear.year,
        data: dataForChart,
        commercialFirstname: saleYear.commercial_firstname,
        commercialLastName: saleYear.commercial_lastname,
      }); // pour faciliter la réutilisation des données, le tableau est rempli des données formatées pour les graphiques avec l'année, le tableau des données mensuelles et les informations du commercial
    });
    allCommercialsFormatedSales.push(commercialCharts); // on stocke toutes les données de tous les commerciaux dans un tableau
  });
  return allCommercialsFormatedSales;
};

const getAllSalesForCurrentYear = async () => {
  let annualSales = [];
  for (let i = 1; i <= 12; i++) {
    // pour chaque mois de l'année
    const [sales] = await Visit.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: [{ $month: "$date" }, i] },
              { $eq: [{ $year: "$date" }, new Date().getFullYear()] },
            ],
          },
        },
      },
      {
        $group: {
          _id: i,
          salesNb: { $sum: 1 }, // on compte le nombre de vente
          total: { $sum: "$sales" }, // on compte le total du CA
          forecastTotal: { $sum: "$forecast_sales" }, // on compte le total du prévisionnel
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
  formatAllSales,
  getAllSalesForCurrentYear,
};
