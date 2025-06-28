import express from "express";
import {
  createMaterial,
  getMaterialById, 
  getMaterialWorks, 
  getMaterialWorkById, 
  updateMaterial, 
  deleteMaterial,  
} from '../usecases/material.js';

const router = express.Router();

//花材の登録
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
    const result = await createMaterial(name);
    res.status(201)
      .header('Location', result)
      .send({ message: 'material created', path: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 花材の情報の取得
router.get("/:materialId", async (req, res) => {
  try{
      const { materialId } = req.params;
      if (!/^\d+$/.test(materialId)) {
        return res.status(400).json({ message: "Invalid materialId" });
      };
      const result = await getMaterialById(materialId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// 花材の作品一覧の取得
router.get("/:materialId/works", async (req, res) => {
  try{
      const { materialId } = req.params;
      if (!/^\d+$/.test(materialId)) {
        return res.status(400).json({ message: "Invalid materialId" });
      };
      const result = await getMaterialWorks(materialId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// 花材の特定の作品の取得
router.get("/:materialId/works/:workId", async (req, res) => {
  try {
    const { materialId, workId } = req.params;
    if (!/^\d+$/.test(materialId)) {
      return res.status(400).json({ message: "Invalid materialId" });
    };
    if (!/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Invalid workId" });
    };
    const result = await getMaterialWorkById(materialId, workId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// 花材の更新
router.put("/:materialId", async (req, res) => {
  try{
      const { materialId } = req.params;
      const { name } = req.body;
      if (!/^\d+$/.test(materialId)) {
        return res.status(400).json({ message: "Invalid materialId" });
      };
      const result = await updateMaterial(materialId, name);
      res.status(204).send();
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// 花材の削除
router.delete("/:materialId", async (req, res) => {
  try {
    const { materialId } = req.params;
    if (!/^\d+$/.test(materialId)) {
      return res.status(400).json({ message: "Invalid materialId" });
    };
    const result = await deleteMaterial(materialId);
    if (!result) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.status(204).send();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

export default router;