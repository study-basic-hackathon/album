import express from "express";
import { putExhibition } from '../usecases/putExhibition.js';

const router = express.Router();

// 華展の更新
router.get("/:exhibitionId", async (req, res) => {
  try{
      const { exhibitionId, name, started_date, ended_date } = req.params;
      if (!/^\d+$/.test(exhibitionId)) {
        return res.status(400).json({ message: "Invalid exhibitionId" });
      };
      const result = await putExhibition(exhibitionId, name, started_date, ended_date);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});
