import express from "express";
import {
  getExhibitions,
  createExhibition,
  getExhibitionById,
  getExhibitionWorks,
  getExhibitionWorkById,
  updateExhibition,
  deleteExhibition,
} from "../usecases/exhibition.js";
import {
  convertExhibitionPayload,
  convertExhibitionId,
  convertExhibitionAndWorkIds,
} from "../converter/exhibition/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

// 華展の一覧
router.get("/", async (req, res) => {
  const result = await getExhibitions();
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

//華展の登録
router.post("/", async (req, res) => {
  const payload = convertExhibitionPayload(req.body);
  const result = await createExhibition(payload);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/exhibitions/${data}`).end(),
    res
  );
});

// 華展の情報の取得
router.get("/:exhibitionId", async (req, res) => {
  const id = convertExhibitionId(req.params);
  const result = await getExhibitionById(id);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 華展の作品一覧の取得
router.get("/:exhibitionId/works", async (req, res) => {
  const id = convertExhibitionId(req.params);
  const result = await getExhibitionWorks(id);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 華展の特定の作品の取得
router.get("/:exhibitionId/works/:workId", async (req, res) => {
  const ids = convertExhibitionAndWorkIds(req.params);
  const result = await getExhibitionWorkById(ids);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 華展の更新
router.put("/:exhibitionId", async (req, res) => {
  const id = convertExhibitionId(req.params);
  const payload = convertExhibitionPayload(req.body);
  const result = await updateExhibition(id, payload);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// 華展の削除
router.delete("/:exhibitionId", async (req, res) => {
  const id = convertExhibitionId(req.params);
  const result = await deleteExhibition(id);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
