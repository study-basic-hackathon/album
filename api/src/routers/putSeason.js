import express from "express";
import { putSeason } from '../usecases/putSeason.js';

const router = express.Router();

// 季節の更新
router.get("/:seasonId", async (req, res) => {
  try{
      const { seasonId, name } = req.params;
      if (!/^\d+$/.test(seasonId)) {
        return res.status(400).json({ message: "Invalid seasonId" });
      };
      const result = await putSeason(seasonId, name);
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