import { Router } from "express";
import { portfolioData } from "../data/portfolioData.js";

const router = Router();

router.get("/summary", async (_req, res) => {
  res.json({
    status: "ok",
    db: false,
    portfolio: portfolioData,
  });
});

export default router;