import express from "express";
import { ClientController } from "../controllers/clientController.js";
import dataValidation from "../services/validation.js";
import checkCredentials from "../services/credentials.js";

export const clientRoutes = express.Router();

clientRoutes.use(checkCredentials);

clientRoutes.get("/", ClientController.getClients);

clientRoutes.get("/:id", ClientController.getOneClient);

clientRoutes.post("/", dataValidation.client, ClientController.createClient);

clientRoutes.put("/:id", dataValidation.client, ClientController.updateClient);

clientRoutes.delete("/:id", ClientController.deleteClient);
