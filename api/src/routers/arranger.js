import express from "express";
import { getArrangerById, getArrangerWorks, getArrangerWorkById } from '../usecases/arranger.js';

const router = express.Router();

// 作者の情報の取得
router.get("/:arrangerId", async (req, res) => {
    try{
      const { arrangerId } = req.params;
      if (typeof arrangerId !== 'string' || !/^\d+$/.test(arrangerId)) {
        return res.status(400).json({ message: "Bad Request" });
      };
      const result = await getArrangerById(arrangerId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
    };
});

// 作者の作品一覧の取得
router.get("/:arrangerId/works", async (req, res) => {
  try{
      const { arrangerId } = req.params;
      if (typeof arrangerId !== 'string' || !/^\d+$/.test(arrangerId)) {
        return res.status(400).json({ message: "Bad Request: Invalid arrangerId" });
      };
      const result = await getArrangerWorks(arrangerId);
      if (result.length === 0) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("DB Error:", err);
      res.status(500).json({ error: "Database query failed" });
    };
});

// 作者の特定の作品の取得
router.get("/:arrangerId/works/:workId", async (req, res) => {
  try {
    const { arrangerId, workId } = req.params;
    if (typeof arrangerId !== 'string' || !/^\d+$/.test(arrangerId)) {
      return res.status(400).json({ message: "Bad Request: Invalid arrangerId" });
    };
    if (typeof workId !== 'string' || !/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Bad Request: Invalid workId" });
    };
    const result = await getArrangerWorkById(arrangerId, workId);
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