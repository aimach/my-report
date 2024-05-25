import express from "express";
import { ArticleController } from "../controllers/articleController.js";
import dataValidation from "../services/validation.js";
import checkCredentials from "../services/credentials.js";

export const articleRoutes = express.Router();

articleRoutes.use(checkCredentials);

articleRoutes.get("/", ArticleController.getArticles);

articleRoutes.get("/:id", ArticleController.getOneArticle);

articleRoutes.post(
  "/",
  dataValidation.article,
  ArticleController.createArticle
);

articleRoutes.put(
  "/:id",
  ArticleController.createArticle,
  dataValidation.article,
  ArticleController.updateArticle
);

articleRoutes.delete("/:id", ArticleController.deleteArticle);
