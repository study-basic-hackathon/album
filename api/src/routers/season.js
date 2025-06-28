import express from "express";
import { 
  createSeason,
  getSeasonById, 
  getSeasonWorks, 
  getSeasonWorkById, 
  updateSeason, 
  deleteSeason } from '../usecases/season.js';

const router = express.Router();

//季節の登録
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const forbiddenChars = /[<>{}[\]|\\^`$"'=]/;
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }
    if (forbiddenChars.test(name)) {
      return res.status(400).json({ message: "Invalid Name" });
    }
    const seasonId = await createSeason(name);
    const path = `/seasons/${seasonId}`;
    res.status(201)
      .header('Location', path)
      .send({ message: 'Season created', path: path });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

// 季節の更新
router.put("/:seasonId", async (req, res) => {
  try{
      const { seasonId } = req.params;
      const { name } = req.body;
      if (!/^\d+$/.test(seasonId)) {
        return res.status(400).json({ message: "Invalid seasonId" });
      };
      const result = await updateSeason(seasonId, name);
      res.status(204).send();
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// 季節の削除
router.delete("/:seasonId", async (req, res) => {
  try {
    const { seasonId } = req.params;
    if (!/^\d+$/.test(seasonId)) {
      return res.status(400).json({ message: "Invalid seasonId" });
    };
    const result = await deleteSeason(seasonId);
    if (!result) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;