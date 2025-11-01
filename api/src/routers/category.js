import express from "express";
import {
  createCategory,
  getCategoryById,
  getCategoryWorks,
  getCategoryWorkById,
  updateCategory,
  deleteCategory,
} from "../usecases/category.js";
import {
  convertCategoryPayload,
  convertCategoryId,
  convertCategoryAndWorkIds,
} from "../converter/category/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

//カテゴリの登録
router.post("/", async (req, res) => {
  const payload = convertCategoryPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await createCategory(payload.data);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/categories/${data}`).end(),
    res
  );
});

// カテゴリーの情報の取得
router.get("/:categoryId", async (req, res) => {
  const id = convertCategoryId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await getCategoryById(id.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// カテゴリーの作品一覧の取得
router.get("/:categoryId/works", async (req, res) => {
  const id = convertCategoryId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await getCategoryWorks(id.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// カテゴリーの特定の作品の取得
router.get("/:categoryId/works/:workId", async (req, res) => {
  const ids = convertCategoryAndWorkIds(req.params);
  if (ids.isFailure()) {
    return handleResult(ids, null, res);
  }
  const result = await getCategoryWorkById(ids.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// カテゴリの更新
router.put("/:categoryId", async (req, res) => {
  const id = convertCategoryId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const payload = convertCategoryPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await updateCategory(id.data, payload.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// カテゴリの削除
router.delete("/:categoryId", async (req, res) => {
  const id = convertCategoryId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await deleteCategory(id.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
