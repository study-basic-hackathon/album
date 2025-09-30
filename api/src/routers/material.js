import express from "express";
import {
  createMaterial,
  getMaterialById,
  getMaterialWorks,
  getMaterialWorkById,
  updateMaterial,
  deleteMaterial,
} from "../usecases/material.js";
import {
  convertMaterialPayload,
  convertMaterialId,
  convertMaterialAndWorkIds,
} from "../converter/material/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

//花材の登録
router.post("/", async (req, res) => {
  const payload = convertMaterialPayload(req.body);
  const result = await createMaterial(payload);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/materials/${data}`).end(),
    res
  );
});

// 花材の情報の取得
router.get("/:materialId", async (req, res) => {
  const id = convertMaterialId(req.params);
  const result = await getMaterialById(id);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 花材の作品一覧の取得
router.get("/:materialId/works", async (req, res) => {
  const id = convertMaterialId(req.params);
  const result = await getMaterialWorks(id);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 花材の特定の作品の取得
router.get("/:materialId/works/:workId", async (req, res) => {
  const ids = convertMaterialAndWorkIds(req.params);
  const result = await getMaterialWorkById(ids);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 花材の更新
router.put("/:materialId", async (req, res) => {
  const id = convertMaterialId(req.params);
  const payload = convertMaterialPayload(req.body);
  const result = await updateMaterial(id, payload);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// 花材の削除
router.delete("/:materialId", async (req, res) => {
  const id = convertMaterialId(req.params);
  const result = await deleteMaterial(id);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
