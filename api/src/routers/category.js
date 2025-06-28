import express from "express";
import { 
  getCategoryPath,
  getCategoryById, 
  getCategoryWorks, 
  getCategoryWorkById, 
  updateCategory, 
  deleteCategory 
} from '../usecases/category.js';

const router = express.Router();

//カテゴリの登録
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
    const result = await getCategoryPath(name);
    res.status(201)
      .header('Location', result)
      .send({ message: 'Category created', path: result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// カテゴリーの情報の取得
router.get("/:categoryId", async (req, res) => {
  try{
      const { categoryId } = req.params;
      if (!/^\d+$/.test(categoryId)) {
        return res.status(400).json({ message: "Invalid categoryId" });
      };
      const result = await getCategoryById(categoryId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// カテゴリーの作品一覧の取得
router.get("/:categoryId/works", async (req, res) => {
  try{
      const { categoryId } = req.params;
      if (!/^\d+$/.test(categoryId)) {
        return res.status(400).json({ message: "Invalid categoryId" });
      };
      const result = await getCategoryWorks(categoryId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.json(result);
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// カテゴリーの特定の作品の取得
router.get("/:categoryId/works/:workId" , async (req, res) => {
  try {
    const { categoryId, workId } = req.params;
    if (!/^\d+$/.test(categoryId)) {
      return res.status(400).json({ message: "Invalid categoryId" });
    };
    if (!/^\d+$/.test(workId)) {
      return res.status(400).json({ message: "Invalid workId" });
    };
    const result = await getCategoryWorkById(categoryId, workId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

// カテゴリの更新
router.put("/:categoryId", async (req, res) => {
  try{
      const { categoryId } = req.params;
      const { name } = req.body;
      if (!/^\d+$/.test(categoryId)) {
        return res.status(400).json({ message: "Invalid categoryId" });
      };
      const result = await updateCategory(categoryId, name);
      res.status(204).send();
  } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    };
});

// カテゴリの削除
router.delete("/:categoryId", async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (!/^\d+$/.test(categoryId)) {
      return res.status(400).json({ message: "Invalid categoryId" });
    };
    const result = await deleteCategory(categoryId);
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