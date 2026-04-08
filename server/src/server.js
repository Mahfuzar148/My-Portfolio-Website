import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirPath = path.dirname(currentFilePath);

dotenv.config({ path: path.resolve(currentDirPath, "../.env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "healthy" });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);

app.listen(port, () => {
  console.log(`Portfolio server running on port ${port}`);
});