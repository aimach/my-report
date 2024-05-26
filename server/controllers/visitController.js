import Visit from "../models/visit.js";

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
      let visits = await Visit.find({
        commercial: req.user.commercialId,
      })
        .populate([
          { path: "commercial" },
          { path: "client" },
          { path: "article" },
        ])
        .sort(sort)
        .skip(parseInt(resultNb, 10) * (parseInt(currentPage, 10) - 1))
        .limit(parseInt(resultNb, 10))
        .exec();

      if (req.query.sort === "client" && req.query.direction === "asc") {
        visits = visits.sort((a, b) => {
          if (a.client.lastname < b.client.lastname) return -1;
          if (a.client.lastname > b.client.lastname) return 1;
          return 0;
        });
      } else if (
        req.query.sort === "client" &&
        req.query.direction === "desc"
      ) {
        visits = visits.sort((a, b) => {
          if (a.client.lastname > b.client.lastname) return -1;
          if (a.client.lastname < b.client.lastname) return 1;
          return 0;
        });
      }

      if (req.query.sort === "article" && req.query.direction === "asc") {
        visits = visits.sort((a, b) => {
          if (a.article.name < b.article.name) return -1;
          if (a.article.name > b.article.name) return 1;
          return 0;
        });
      } else if (
        req.query.sort === "article" &&
        req.query.direction === "desc"
      ) {
        visits = visits.sort((a, b) => {
          if (a.article.name > b.article.name) return -1;
          if (a.article.name < b.article.name) return 1;
          return 0;
        });
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
      if (id === "count") {
        let count = await Visit.countDocuments({
          commercial: req.user.commercialId,
        });
        res.send({ count }).status(200);
      } else {
        let visit = await Visit.findById(id).exec();
        if (!visit) {
          res.send("Visite non trouvée").status(404);
        } else {
          res.send(visit).status(200);
        }
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
