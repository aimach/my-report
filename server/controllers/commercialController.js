import Commercial from "../models/commercial.js";

export const CommercialController = {
  getCommercials: async (req, res) => {
    try {
      let commercials = await Commercial.find().exec();
      if (!commercials.length) {
        res.send("Pas de commerciaux").status(200);
      } else {
        res.send(commercials).status(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  getOneCommercial: async (req, res) => {
    const { id } = req.params;
    try {
      let commercial = await Commercial.findById(id).exec();
      if (!commercial) {
        res.send("Commercial non trouvé").status(404);
      } else {
        res.send(commercial).status(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  updateCommercial: async (req, res) => {
    try {
      const updateCommercial = await Commercial.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateCommercial) {
        return res.status(404).json({ error: "Commercial non trouvé" });
      }
      res.status(200).json(updateCommercial);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  deleteCommercial: async (req, res) => {
    const { id } = req.params;
    try {
      let commercial = await Commercial.findById(id).exec();
      if (!commercial) {
        res.send("Ce commercial n'existe pas").status(404);
      } else {
        await Commercial.deleteOne({ _id: commercial.id });
        res.status(200).send("Commercial supprimé");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },
};
