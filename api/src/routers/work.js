import express from "express";
import { updateWork, deleteWork, createWork } from "../usecases/work.js";
import { convertWorkPayload, convertWorkId } from "../converter/work/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

//作品の登録
router.post("/", async (req, res) => {
  const payload = convertWorkPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await createWork(payload.data);
  return handleResult(result, (res, data) => res.status(201).location(`/works/${data}`).end(), res);
});

// 作品の更新
router.put("/:workId", async (req, res) => {
  const id = convertWorkId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const payload = convertWorkPayload(req.body);
  if (payload.isFailure()) {
    return handleResult(payload, null, res);
  }
  const result = await updateWork(id.data, payload.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// 作品の削除
router.delete("/:workId", async (req, res) => {
  const id = convertWorkId(req.params);
  if (id.isFailure()) {
    return handleResult(id, null, res);
  }
  const result = await deleteWork(id.data);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
