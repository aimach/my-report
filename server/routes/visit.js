import express from "express";
import { VisitController } from "../controllers/visitController.js";

export const visitRoutes = express.Router();

visitRoutes.get("/", VisitController.getVisits);

visitRoutes.get("/:id", VisitController.getOneVisit);

visitRoutes.post("/", VisitController.createVisit);

visitRoutes.put("/:id", VisitController.updateVisit);

visitRoutes.delete("/:id", VisitController.deleteVisit);
