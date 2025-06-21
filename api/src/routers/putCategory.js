import express from "express";
import { putCategory } from '../usecases/putCategory.js';

const router = express.Router();

// カテゴリの更新
router.get("/:categoryId", async (req, res) => {
  try{
      const { categoryId, name } = req.params;
      if (!/^\d+$/.test(categoryId)) {
        return res.status(400).json({ message: "Invalid categoryId" });
      };
      const result = await putCategory(categoryId, name);
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