import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { clientRoutes } from "./routes/client.js";
import { commercialRoutes } from "./routes/commercial.js";
import { articleRoutes } from "./routes/article.js";
import { visitRoutes } from "./routes/visit.js";
import { authRoutes } from "./routes/auth.js";

const backendPort = process.env.PORT || 5050;
const frontendURL = process.env.FRONTEND_URL || 5173;
const uri = process.env.ATLAS_URI || "";

const app = express();

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connexion à MongoDB réussie !");
  })
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(cors({ origin: [frontendURL], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// routes declaration
app.use("/api/clients", clientRoutes);
app.use("/api/commercials", commercialRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/auth", authRoutes);

// start the Express server
app.listen(backendPort, () => {
  console.log(`Server listening on port ${backendPort}`);
});
