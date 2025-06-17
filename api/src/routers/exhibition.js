import express from "express";
import { getExhibitions, getExhibitionById, getExhibitionWorks, getExhibitionWorkById } from '../usecases/exhibition.js';

const router = express.Router();

// 華展の一覧
router.get("/", async (req, res) => {
  try{
      const result = await getExhibitions();
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 華展の情報の取得
router.get("/:exhibitionId", async (req, res) => {
  try{
      const { exhibitionId } = req.params;
      if (typeof exhibitionId !== 'string' || !/^\d+$/.test(exhibitionId)) {
        return res.status(400).json({ message: "Bad Request: Invalid exhibitionId" });
      };
      const result = await getExhibitionById(exhibitionId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 華展の作品一覧の取得
router.get("/:exhibitionId/works", async (req, res) => {
  try{
      const { exhibitionId } = req.params;
      if (typeof exhibitionId !== 'string' || !/^\d+$/.test(exhibitionId)) {
        return res.status(400).json({ message: "Bad Request: Invalid exhibitionId" });
      };
      const result = await getExhibitionWorks(exhibitionId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 華展の特定の作品の取得
router.get("/:exhibitionId/works/:workId", async (req, res) => {
  try {
    const { exhibitionId, workId } = req.params;
    if (typeof exhibitionId !== 'string' || !/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Bad Request: Invalid exhibitionId" });
    };
    if (typeof workId !== 'string' || !/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Bad Request: Invalid workId" });
    };
    const result = await getExhibitionWorkById(exhibitionId, workId);
    if (result.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  };
});

export default router;