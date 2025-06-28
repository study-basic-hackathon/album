import express from "express";
import {
  getExhibitions,
  createExhibition,
  getExhibitionById,
  getExhibitionWorks,
  getExhibitionWorkById,
  updateExhibition,
  deleteExhibition
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

//華展の登録
router.post("/", async (req, res) => {
  try {
    const { name, started_date, ended_date } = req.body;
    const forbiddenChars = /[<>{}[\]|\\^`$"'=]/;
    if (!name) {
      return res.status(400).send({ message: 'Name is required' });
    }
    if (forbiddenChars.test(name)) {
      return res.status(400).json({ message: "Invalid Name" });
    }
    if (!started_date || new Date(started_date).toString() === 'Invalid Date') {
      return res.status(400).json({ message: 'Invalid started_date' })
    }
    if (!ended_date || new Date(ended_date).toString() === 'Invalid Date') {
      return res.status(400).json({ message: 'Invalid ended_date' });
    }
    if (new Date(started_date) > new Date(ended_date)) {
      return res.status(400).json({ message: 'started_date cannot be after ended_date.' });
    }
    const exhibitionId = await createExhibition( name, started_date, ended_date );
    const path = `/exhibitions/${exhibitionId}`;
    res.status(201).header('Location', path)
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
router.put("/:exhibitionId", async (req, res) => {
  try {
    const { exhibitionId } = req.params;
    const { name, started_date, ended_date } = req.body;
    if (!/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Invalid exhibitionId" });
    };
    const result = await updateExhibition(exhibitionId, name, started_date, ended_date);
    res.status(204).send();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 華展の削除
router.delete("/:exhibitionId", async (req, res) => {
  try {
    const { exhibitionId } = req.params;
    if (!/^\d+$/.test(exhibitionId)) {
      return res.status(400).json({ message: "Invalid exhibitionId" });
    };
    const result = await deleteExhibition(exhibitionId);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.status(204).send();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
