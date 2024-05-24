import express from "express";
import { ArticleController } from "../controllers/articleController.js";

export const articleRoutes = express.Router();

articleRoutes.get("/", ArticleController.getArticles);

articleRoutes.get("/:id", ArticleController.getOneArticle);

articleRoutes.post("/", ArticleController.createArticle);

articleRoutes.put("/:id", ArticleController.updateArticle);

articleRoutes.delete("/:id", ArticleController.deleteArticle);
