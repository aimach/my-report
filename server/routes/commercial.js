import express from "express";
import { CommercialController } from "../controllers/commercialController.js";
import dataValidation from "../services/validation.js";
import checkCredentials from "../services/credentials.js";

export const commercialRoutes = express.Router();

commercialRoutes.use(checkCredentials);

commercialRoutes.get("/", CommercialController.getCommercials);

commercialRoutes.get("/:id", CommercialController.getOneCommercial);

commercialRoutes.put(
  "/:id",
  dataValidation.commercial,
  CommercialController.updateCommercial
);

commercialRoutes.delete("/:id", CommercialController.deleteCommercial);
