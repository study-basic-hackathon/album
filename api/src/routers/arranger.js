import express from "express";
import {
  getArrangerById,
  getArrangerWorks,
  getArrangerWorkById,
  updateArranger
} from "../usecases/arranger.js";

const router = express.Router();

// 作者の情報の取得
router.get("/:arrangerId", async (req, res) => {
  try {
    const { arrangerId } = req.params;
    if (!/^\d+$/.test(arrangerId)) {
      return res.status(400).json({ message: "Invalid arrangerId" });
    }
    const result = await getArrangerById(arrangerId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 作者の作品一覧の取得
router.get("/:arrangerId/works", async (req, res) => {
  try {
    const { arrangerId } = req.params;
    if (!/^\d+$/.test(arrangerId)) {
      return res.status(400).json({ message: "Invalid arrangerId" });
    }
    const result = await getArrangerWorks(arrangerId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 作者の特定の作品の取得
router.get("/:arrangerId/works/:workId", async (req, res) => {
  try {
    const { arrangerId, workId } = req.params;
    if (!/^\d+$/.test(arrangerId)) {
      return res.status(400).json({ message: "Invalid arrangerId" });
    }
    if (!/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Invalid workId" });
    }
    const result = await getArrangerWorkById(arrangerId, workId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 作者の更新
router.put("/:arrangerId", async (req, res) => {
  try {
    const { arrangerId, name } = req.params;
    if (!/^\d+$/.test(arrangerId)) {
      return res.status(400).json({ message: "Invalid arrangerId" });
    }
    const result = await updateArranger(arrangerId, name);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
