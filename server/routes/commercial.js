import express from "express";
import { CommercialController } from "../controllers/commercialController.js";

export const commercialRoutes = express.Router();

commercialRoutes.get("/", CommercialController.getCommercials);

commercialRoutes.get("/:id", CommercialController.getOneCommercial);

commercialRoutes.put("/:id", CommercialController.updateCommercial);

commercialRoutes.delete("/:id", CommercialController.deleteCommercial);
