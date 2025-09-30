import express from "express";
import multer from "multer";
import { getImage, createImage, deleteImage } from "../usecases/image.js";
import { handleResult } from "./utils/index.js";
import { convertFile, convertImageId } from "../converter/image/index.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// 画像の登録
router.post("/", upload.single("file"), async (req, res) => {
  const file = convertFile(req.file);
  const result = await createImage(file);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/images/${data}`).end(),
    res
  );
});

// 画像の取得
router.get("/:imageId", async (req, res) => {
  const id = convertImageId(req.params);
  const result = await getImage(id);
  return handleResult(result, (res, data) => res.sendFile(data), res);
});

// 画像の削除
router.delete("/:imageId", async (req, res) => {
  const id = convertImageId(req.params);
  const result = await deleteImage(id);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
