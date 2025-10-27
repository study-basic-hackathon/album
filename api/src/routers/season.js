import express from "express";
import {
  createSeason,
  getSeasonById,
  getSeasonWorks,
  getSeasonWorkById,
  updateSeason,
  deleteSeason,
} from "../usecases/season.js";
import {
  convertSeasonPayload,
  convertSeasonId,
  convertSeasonAndWorkIds,
} from "../converter/season/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

//季節の登録
router.post("/", async (req, res) => {
  const payload = convertSeasonPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await createSeason(payload.data);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/seasons/${data}`).end(),
    res
  );
});

// 季節の情報の取得
router.get("/:seasonId", async (req, res) => {
  const id = convertSeasonId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await getSeasonById(id.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 季節の作品一覧の取得
router.get("/:seasonId/works", async (req, res) => {
  const id = convertSeasonId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await getSeasonWorks(id.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 季節の特定の作品の取得
router.get("/:seasonId/works/:workId", async (req, res) => {
  const ids = convertSeasonAndWorkIds(req.params);
    if (ids.isFailure()) {
    return handleResult(ids, null, res);
  }
  const result = await getSeasonWorkById(ids.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 季節の更新
router.put("/:seasonId", async (req, res) => {
  const id = convertSeasonId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const payload = convertSeasonPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await updateSeason(id.data, payload.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// 季節の削除
router.delete("/:seasonId", async (req, res) => {
  const id = convertSeasonId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await deleteSeason(id.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
