import express from "express";
import { getMaterialById, getMaterialWorks, getMaterialWorkById } from '../usecases/material.js';

const router = express.Router();

// 花材の情報の取得
router.get("/:materialId", async (req, res) => {
  try{
      const { materialId } = req.params;
      if (typeof materialId !== 'string' || !/^\d+$/.test(materialId)) {
        return res.status(400).json({ message: "Bad Request: Invalid materialId" });
      };
      const result = await getMaterialById(materialId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 花材の作品一覧の取得
router.get("/:materialId/works", async (req, res) => {
  try{
      const { materialId } = req.params;
      if (typeof materialId !== 'string' || !/^\d+$/.test(materialId)) {
        return res.status(400).json({ message: "Bad Request: Invalid materialId" });
      };
      const result = await getMaterialWorks(materialId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 花材の特定の作品の取得
router.get("/:materialId/works/:workId", async (req, res) => {
  try {
    const { materialId, workId } = req.params;
    if (typeof materialId !== 'string' || !/^\d+$/.test(materialId)) {
      return res.status(400).json({ message: "Bad Request: Invalid materialId" });
    };
    if (typeof workId !== 'string' || !/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Bad Request: Invalid workId" });
    };
    const result = await getMaterialWorkById(materialId, workId);
    if (result.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Database query failed" });
  };
});

export default router;