import express from "express";
import {
  createArranger,
  getArrangerById,
  getArrangerWorks,
  getArrangerWorkById,
  updateArranger,
  deleteArranger,
} from "../usecases/arranger.js";
import {
  convertArrangerPayload,
  convertArrangerId,
  convertArrangerAndWorkIds,
} from "../converter/arranger/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

//作者の登録
router.post("/", async (req, res) => {
  const payload = convertArrangerPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await createArranger(payload.data);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/arrangers/${data}`).end(),
    res
  );
});

// 作者の情報の取得
router.get("/:arrangerId", async (req, res) => {
  const id = convertArrangerId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await getArrangerById(id.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 作者の作品一覧の取得
router.get("/:arrangerId/works", async (req, res) => {
  const id = convertArrangerId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await getArrangerWorks(id.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 作者の特定の作品の取得
router.get("/:arrangerId/works/:workId", async (req, res) => {
  const ids = convertArrangerAndWorkIds(req.params);
  if (ids.isFailure()) {
    return handleResult(ids, null, res);
  }
  const result = await getArrangerWorkById(ids.data);
  return handleResult(result, (res, data) => res.status(200).json(data), res);
});

// 作者の更新
router.put("/:arrangerId", async (req, res) => {
  const id = convertArrangerId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const payload = convertArrangerPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await updateArranger(id.data, payload.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// 作者の削除
router.delete("/:arrangerId", async (req, res) => {
  const id = convertArrangerId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await deleteArranger(id.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
