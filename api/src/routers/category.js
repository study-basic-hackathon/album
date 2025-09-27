import express from "express";
import {
  createCategory,
  getCategoryById,
  getCategoryWorks,
  getCategoryWorkById,
  updateCategory,
  deleteCategory
} from '../usecases/category.js';
import {
  convertCategoryPayload,
  convertCategoryId,
  convertCategoryAndWorkIds,
} from "../converter/category/index.js"
import { handleResult } from "./utils/index.js";

const router = express.Router();

//カテゴリの登録
router.post("/", async (req, res) => {
  const payload = convertCategoryPayload(req.body);
  const result = await createCategory(payload);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/categories/${data}`).end(),
    res
  );
});

// カテゴリーの情報の取得
router.get("/:categoryId", async (req, res) => {
  const id = convertCategoryId(req.params);
  const result = await getCategoryById(id);
  return handleResult(
    result,
    (res, data) => res.status(200).json(data),
    res
  );
});

// カテゴリーの作品一覧の取得
router.get("/:categoryId/works", async (req, res) => {
  const id = convertCategoryId(req.params);
  const result = await getCategoryWorks(id);
  return handleResult(
    result,
    (res, data) => res.status(200).json(data),
    res
  );
});

// カテゴリーの特定の作品の取得
router.get("/:categoryId/works/:workId" , async (req, res) => {
  const ids = convertCategoryAndWorkIds(req.params);
  const result = await getCategoryWorkById(ids);
  return handleResult(
    result,
    (res, data) => res.status(200).json(data),
    res
  );
});

// カテゴリの更新
router.put("/:categoryId", async (req, res) => {
  const id = convertCategoryId(req.params);
  const payload = convertCategoryPayload(req.body);
  const result = await updateCategory(id, payload);
  return handleResult(
    result,
    (res, data) => res.status(204).end(),
    res
  );
});

// カテゴリの削除
router.delete("/:categoryId", async (req, res) => {
  const id = convertCategoryId(req.params);
  const result = await deleteCategory(id);
  return handleResult(
    result,
    (res, data) => res.status(204).end(),
    res
  );
});

export default router;