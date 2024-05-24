import express from "express";
import { ClientController } from "../controllers/clientController.js";

export const clientRoutes = express.Router();

clientRoutes.get("/", ClientController.getClients);

clientRoutes.get("/:id", ClientController.getOneClient);

clientRoutes.post("/", ClientController.createClient);

clientRoutes.put("/:id", ClientController.updateClient);

clientRoutes.delete("/:id", ClientController.deleteClient);
