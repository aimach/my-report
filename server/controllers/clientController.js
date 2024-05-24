import Client from "../models/client.js";

export const ClientController = {
  getClients: async (req, res) => {
    try {
      let clients = await Client.find().exec();
      if (!clients.length) {
        res.send("Pas de clients").status(200);
      } else {
        res.send(clients).status(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  getOneClient: async (req, res) => {
    const { id } = req.params;
    try {
      let client = await Client.findById(id).exec();
      if (!client) {
        res.send("Client non trouvé").status(404);
      } else {
        res.send(client).status(200);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  createClient: async (req, res) => {
    try {
      const newClient = new Client(req.body);
      const savedClient = await newClient.save();
      res.status(201).send(savedClient);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  updateClient: async (req, res) => {
    try {
      const updateClient = await Client.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateClient) {
        return res.status(404).json({ error: "Client non trouvé" });
      }
      res.status(200).json(updateClient);
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },

  deleteClient: async (req, res) => {
    const { id } = req.params;
    try {
      let client = await Client.findById(id).exec();
      if (!client) {
        res.send("Cet client n'existe pas").status(404);
      } else {
        await Client.deleteOne({ _id: client.id });
        res.status(200).send("Client supprimé");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Erreur serveur");
    }
  },
};
