import express from "express";
import { VisitController } from "../controllers/visitController.js";
import dataValidation from "../services/validation.js";

export const visitRoutes = express.Router();

visitRoutes.get("/", VisitController.getVisits);

visitRoutes.get("/:id", VisitController.getOneVisit);

visitRoutes.post("/", dataValidation.visit, VisitController.createVisit);

visitRoutes.put("/:id", dataValidation.visit, VisitController.updateVisit);

visitRoutes.delete("/:id", VisitController.deleteVisit);
