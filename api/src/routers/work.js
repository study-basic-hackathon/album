import express from "express";
import { updateWork, deleteWork, createWork } from "../repositories/work.js";

const router = express.Router();

//作品の登録
router.post("/", async (req, res) => {
  try {
    const { title, arranger_id, material_ids, season_id, category_id, image_ids } = req.body;
    const forbiddenChars = /[<>{}[\]|\\^`$"'=]/;
    if (!title) {
      return res.status(400).send({ message: 'title is required' });
    }
    if (forbiddenChars.test(title)) {
      return res.status(400).json({ message: "Invalid title" });
    }
    const workId = await createWork(title, arranger_id, material_ids, season_id, category_id, image_ids);
    const path = `/works/${workId}`;
    res.status(201).header('Location', path)
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 作品の更新
router.put("/:workId", async (req, res) => {
    try {
        const { workId } = req.params;
        const { title, arranger_id, material_ids, season_id, category_id, image_ids } = req.body;
        if (!/^\d+$/.test(workId)) {
            return res.status(400).json({ message: "Invalid workId" });
        }
        const result = await updateWork(workId, title, arranger_id, material_ids, season_id, category_id, image_ids);
        res.status(204).send();
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    } 
});

// 作品の削除
router.delete("/:workId", async (req, res) => {
    try {
        const { workId } = req.params;
        if (!/^\d+$/.test(workId)) {
            return res.status(400).json({ message: "Invalid workId" });
        }
        const result = await deleteWork(workId);
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