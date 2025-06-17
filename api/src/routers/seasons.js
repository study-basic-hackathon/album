import express from "express";
import { getSeasonById, getSeasonWorks, getSeasonWorkById } from '../usecases/season.js';

const router = express.Router();

// 季節の情報の取得
router.get("/:seasonId", async (req, res) => {
  try{
      const { seasonId } = req.params;
      if (typeof seasonId !== 'string' || !/^\d+$/.test(seasonId)) {
        return res.status(400).json({ message: "Bad Request: Invalid seasonId" });
      };
      const result = await getSeasonById(seasonId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 季節の作品一覧の取得
router.get("/:seasonId/works", async (req, res) => {
  try{
      const { seasonId } = req.params;
      if (typeof seasonId !== 'string' || !/^\d+$/.test(seasonId)) {
        return res.status(400).json({ message: "Bad Request: Invalid seasonId" });
      };
      const result = await getSeasonWorks(seasonId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 季節の特定の作品の取得
router.get("/:seasonId/works/:workId", async (req, res) => {
  try {
    const { seasonId, workId } = req.params;
    if (typeof seasonId !== 'string' || !/^\d+$/.test(seasonId)) {
      return res.status(400).json({ message: "Bad Request: Invalid seasonId" });
    };
    if (typeof workId !== 'string' || !/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Bad Request: Invalid workId" });
    };
    const result = await getSeasonWorkById(seasonId, workId);
    if (result.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
});

export default router;