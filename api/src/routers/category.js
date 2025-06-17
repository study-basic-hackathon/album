import express from "express";
import { getCategoryById, getCategoryWorks, getCategoryWorkById } from '../usecases/category.js';

const router = express.Router();

// カテゴリーの情報の取得
router.get("/:categoryId", async (req, res) => {
  try{
      const { categoryId } = req.params;
      if (typeof categoryId !== 'string' || !/^\d+$/.test(categoryId)) {
        return res.status(400).json({ message: "Bad Request: Invalid categoryId" });
      };
      const result = await getCategoryById(categoryId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// カテゴリーの作品一覧の取得
router.get("/:categoryId/works", async (req, res) => {
  try{
      const { categoryId } = req.params;
      if (typeof categoryId !== 'string' || !/^\d+$/.test(categoryId)) {
        return res.status(400).json({ message: "Bad Request: Invalid categoryId" });
      };
      const result = await getCategoryWorks(categoryId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// カテゴリーの特定の作品の取得
router.get("/:categoryId/works/:workId" , async (req, res) => {
  try {
    const { categoryId, workId } = req.params;
    if (typeof categoryId !== 'string' || !/^\d+$/.test(categoryId)) {
      return res.status(400).json({ message: "Bad Request: Invalid categoryId" });
    };
    if (typeof workId !== 'string' || !/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Bad Request: Invalid workId" });
    };
    const result = await getCategoryWorkById(categoryId, workId);
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