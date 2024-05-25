import express from "express";
import { AuthController } from "../controllers/authController.js";
import dataValidation from "../services/validation.js";

export const authRoutes = express.Router();

authRoutes.post("/register", dataValidation.register, AuthController.register);

authRoutes.post("/login", dataValidation.login, AuthController.login);
