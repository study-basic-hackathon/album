import express from "express";
import { getSeasonById, getSeasonWorks, getSeasonWorkById } from '../usecases/season.js';

const router = express.Router();

// 季節の情報の取得
router.get("/:seasonId", async (req, res) => {
  try{
      const { seasonId } = req.params;
      if (!/^\d+$/.test(seasonId)) {
        return res.status(400).json({ message: "Invalid seasonId" });
      };
      const result = await getSeasonById(seasonId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// 季節の作品一覧の取得
router.get("/:seasonId/works", async (req, res) => {
  try{
      const { seasonId } = req.params;
      if (!/^\d+$/.test(seasonId)) {
        return res.status(400).json({ message: "Invalid seasonId" });
      };
      const result = await getSeasonWorks(seasonId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// 季節の特定の作品の取得
router.get("/:seasonId/works/:workId", async (req, res) => {
  try {
    const { seasonId, workId } = req.params;
    if (!/^\d+$/.test(seasonId)) {
      return res.status(400).json({ message: "Invalid seasonId" });
    };
    if (!/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Invalid workId" });
    };
    const result = await getSeasonWorkById(seasonId, workId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

export default router;