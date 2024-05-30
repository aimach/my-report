import Commercial from "../models/commercial.js";
import Visit from "../models/visit.js";
import {
  findPopulatedVisitWithSkipAndLimit,
  formatAllSales,
  getAllSales,
  getCountVisits,
  getAllSalesForCurrentYear,
  sortVisits,
} from "../services/utils.js";

export const VisitController = {
  getVisits: async (req, res) => {
    const { resultNb, currentPage } = req.query;

    let sort = {};
    if (req.query.sort === "date") {
      sort.date = req.query.direction; // on ajout une clé à l'objet sort avec la direction demandée
    }
    if (req.query.sort === "sales") {
      sort.sales = req.query.direction; // on ajout une clé à l'objet sort avec la direction demandée
    }

    try {
      let visits = await findPopulatedVisitWithSkipAndLimit(
        // on récupère toutes les visites du commercial avec les infos du commercial, du client et de l'article
        req.user.commercialId,
        sort,
        resultNb,
        currentPage
      );

      if (req.query.sort && req.query.direction) {
        // en fonction de la direction, on trie le tableau par ordre croissant ou décroissant
        sortVisits(req.query.sort, req.query.direction, visits);
      }

      res.send(visits).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  getOneVisitOrStats: async (req, res) => {
    const { id } = req.params;
    try {
      switch (id) {
        case "count": // l'id "count" permet de demander le nombre de requêtes total du commercial
          let count = await getCountVisits(req.user.commercialId);
          res.send({ count }).status(200);
          break;
        case "stat": // l'id "stat" permet de demander des statistiques sur les ventes
          if (req.query.type === "monthly") {
            // le type "monthly" permet de récupérer les données pour remplir les graphiques à barres
            const allSalesPerCommercial = await getAllSales(); // on récupère les chiffres des ventes par mois, pour chacun des commerciaux
            const allSalesPerCommercialFormat = formatAllSales(
              allSalesPerCommercial
            ); // on formatte la donnée afin qu'elle puisse être facilement réutilisée côté client
            res.send(allSalesPerCommercialFormat).status(200);
          }
          if (req.query.type === "all") {
            // le type "all" permet de récupérer les données pour remplir les graphiques à points
            const allSalesForCurrentYear = await getAllSalesForCurrentYear(); // on récupère les chiffres mensuels des ventes pour l'année en cours
            res.send(allSalesForCurrentYear).status(200);
          }
          break;
        default: // si un id de la bdd est entré, on va chercher la visite correspondante
          let visit = await Visit.findById(id).exec();
          if (!visit) {
            res.send("Visite non trouvée").status(404);
          } else {
            res.send(visit).status(200);
          }
          break;
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  createVisit: async (req, res) => {
    // ajout de l'id du commercial à partir du JWT
    req.body = { ...req.body, commercial: req.user.commercialId };

    try {
      const newVisit = new Visit(req.body);
      const savedVisit = await newVisit.save();
      res.status(201).send(savedVisit);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  updateVisit: async (req, res) => {
    // on s'assure que le champ commercial est bien celui du commercial qui fait la requête
    req.body.commercial = req.user.commercialId;

    try {
      const updateVisit = await Visit.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!updateVisit) {
        return res.status(404).json({ error: "Visite non trouvée" });
      }
      res.status(200).json(updateVisit);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  deleteVisit: async (req, res) => {
    const { id } = req.params;
    try {
      let visit = await Visit.findById(id).exec();
      if (!visit) {
        res.send("Cette visite n'existe pas").status(404);
      } else {
        await Visit.deleteOne({ _id: visit.id });
        res.status(200).send("Visite supprimé");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },
};
