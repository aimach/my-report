import express from "express";
import { AuthController } from "../controllers/authController.js";
import dataValidation from "../services/validation.js";
import checkCredentials from "../services/credentials.js";

export const authRoutes = express.Router();

authRoutes.post("/register", dataValidation.register, AuthController.register);

authRoutes.post("/login", dataValidation.login, AuthController.login);

authRoutes.get("/profile", checkCredentials, AuthController.getProfile);

authRoutes.get("/logout", AuthController.logout);
