import express from "express";
import { updateWork, deleteWork, createWork } from "../usecases/work.js";
import { convertWorkPayload, convertWorkId } from "../converter/work/index.js";
import { handleResult } from "./utils/index.js";

const router = express.Router();

//作品の登録
router.post("/", async (req, res) => {
  const payload = convertWorkPayload(req.body);
  const result = await createWork(payload);
  return handleResult(result, (res, data) => res.status(201).location(`/works/${data}`).end(), res);
});

// 作品の更新
router.put("/:workId", async (req, res) => {
  const id = convertWorkId(req.params);
  const payload = convertWorkPayload(req.body);
  const result = await updateWork(id, payload);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

// 作品の削除
router.delete("/:workId", async (req, res) => {
  const id = convertWorkId(req.params);
  const result = await deleteWork(id);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
