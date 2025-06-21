import express from "express";
import {
  getExhibitions,
  getExhibitionById,
  getExhibitionWorks,
  getExhibitionWorkById,
  updateExhibition
} from '../usecases/exhibition.js';

const router = express.Router();

// 華展の一覧
router.get("/", async (req, res) => {
  try {
    const result = await getExhibitions();
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 華展の情報の取得
router.get("/:exhibitionId", async (req, res) => {
  try {
    const { exhibitionId } = req.params;
    if (!/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Invalid exhibitionId" });
    };
    const result = await getExhibitionById(exhibitionId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 華展の作品一覧の取得
router.get("/:exhibitionId/works", async (req, res) => {
  try {
    const { exhibitionId } = req.params;
    if (!/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Invalid exhibitionId" });
    };
    const result = await getExhibitionWorks(exhibitionId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 華展の特定の作品の取得
router.get("/:exhibitionId/works/:workId", async (req, res) => {
  try {
    const { exhibitionId, workId } = req.params;
    if (!/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Invalid exhibitionId" });
    };
    if (!/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Invalid workId" });
    };
    const result = await getExhibitionWorkById(exhibitionId, workId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 華展の更新
router.get("/:exhibitionId", async (req, res) => {
  try {
    const { exhibitionId, name, started_date, ended_date } = req.params;
    if (!/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Invalid exhibitionId" });
    };
    const result = await updateExhibition(exhibitionId, name, started_date, ended_date);
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
