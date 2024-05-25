import express from "express";
import { AuthController } from "../controllers/authController.js";

export const authRoutes = express.Router();

authRoutes.post("/register", AuthController.register);

authRoutes.post("/login", AuthController.login);
