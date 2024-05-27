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
    .sort(sort)
    .skip(parseInt(resultNb, 10) * (parseInt(currentPage, 10) - 1))
    .limit(parseInt(resultNb, 10))
    .exec();
};

const getCountVisits = async (commercialId) => {
  return await Visit.countDocuments({
    commercial: commercialId,
  });
};

const getSalesPerCommercial = async (commercial, type) => {
  if (type === "all") {
    return await Visit.aggregate([
      {
        $match: { commercial: new mongoose.Types.ObjectId(commercial._id) },
      },
      {
        $group: {
          _id: 0,
          salesNb: { $sum: 1 },
          total: { $sum: "$sales" },
        },
      },
    ]);
  } else if (type === "monthly") {
    const firstVisit = await getFirstVisit();
    const lastVisit = await getLastVisit();
    const allCommercialSales = [];
    let year = firstVisit[0].year;
    while (year <= lastVisit[0].year) {
      // on parcourt toutes les années de ventes
      let annualSales = [];
      for (let i = 1; i <= 12; i++) {
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
        annualSales.push(sales);
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
  }
};

const getAllSales = async (type) => {
  const allSales = [];
  const commercials = await Commercial.find().exec();
  for (const commercial of commercials) {
    // utilisation de for...of car forEach ne gère pas bien await
    const sales = await getSalesPerCommercial(commercial, type);
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

const getLastVisit = async () => {
  return await Visit.aggregate([
    { $sort: { date: -1 } },
    { $limit: 1 },
    {
      $project: {
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

export {
  sortVisits,
  findPopulatedVisitWithSkipAndLimit,
  getCountVisits,
  getSalesPerCommercial,
  getAllSales,
  getAllSalesMonthly,
};
