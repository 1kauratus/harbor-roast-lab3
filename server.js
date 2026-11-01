import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import requestLogger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import itemsRouter from "./routes/items.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in JSON body parsing
app.use(express.json());

// Allow the Netlify frontend (and local previews) to call the API
app.use(cors());

// Custom logging middleware
app.use(requestLogger);

// Health / welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    name: "Harbor Roast API",
    course: "CSCI 3172 - Lab 3",
    message: "Specialty coffee shop menu REST API",
    endpoints: {
      list: "GET /api/items",
      one: "GET /api/items/:id",
      create: "POST /api/items",
      remove: "DELETE /api/items/:id"
    }
  });
});

// Optional local UI (useful before Netlify deploy)
app.use(express.static(path.join(__dirname, "public")));

// REST resource routes
app.use("/api/items", itemsRouter);

// 404 + centralized error handling (must stay last)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Harbor Roast API listening on port ${PORT}`);
});
