import Commercial from "../models/commercial.js";
import Visit from "../models/visit.js";
import {
  findPopulatedVisitWithSkipAndLimit,
  getAllSales,
  getCountVisits,
  getSalesPerCommercial,
  sortVisits,
} from "../services/utils.js";

export const VisitController = {
  getVisits: async (req, res) => {
    const { resultNb, currentPage } = req.query;

    let sort = {};
    if (req.query.sort === "date") {
      sort.date = req.query.direction;
    }
    if (req.query.sort === "sales") {
      sort.sales = req.query.direction;
    }

    try {
      let visits = await findPopulatedVisitWithSkipAndLimit(
        req.user.commercialId,
        sort,
        resultNb,
        currentPage
      );

      if (req.query.sort && req.query.direction) {
        sortVisits(req.query.sort, req.query.direction, visits);
      }

      res.send(visits).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  getOneVisit: async (req, res) => {
    const { id } = req.params;
    try {
      switch (id) {
        case "count":
          let count = await getCountVisits(req.user.commercialId);
          res.send({ count }).status(200);
          break;
        case "stat":
          const allSalesPerCommercial = await getAllSales(req.query.type);
          res.send(allSalesPerCommercial).status(200);

          break;
        default:
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
        req.body,
        { new: true }
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
