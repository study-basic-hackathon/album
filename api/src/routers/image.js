import express from "express";
import multer from "multer";
import { getImage, createImage, deleteImage } from "../usecases/image.js";
import { handleResult } from "../utils/routers/handleResult.js";
import { convertFile, convertId } from "../converters/routers.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// 画像の登録
router.post("/images", upload.single("file"), async (req, res) => {
  const { file } = convertFile(req.file);
  const result = await createImage(file);
  return handleResult(
    result,
    (res, data) => res.status(201).location(`/images/${data}`).end(),
    res
  );
});

// 画像の取得
router.get("/images/:imageId", async (req, res) => {
  const imageId = convertId(req.params.imageId);
  const result = await getImage(imageId);
  return handleResult(result, (res, data) => res.sendFile(data), res);
});

router.delete("/images/:imageId", async (req, res) => {
  const imageId = convertId(req.params.imageId);
  const result = await deleteImage(imageId);
  return handleResult(result, (res, data) => res.status(204).end(), res);
});

export default router;
