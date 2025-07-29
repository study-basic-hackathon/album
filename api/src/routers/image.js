import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { randomUUID } from "crypto";
import { getImage, createImage, deleteImage } from "../usecases/image.js";
import { handleResult } from "../utils/routers/handleResult.js";
import { tempDir, uploadDir } from "../utils/commons/dirPaths.js";
import { convertId } from "../converters/routers.js";

const router = express.Router();

fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir)
  },
  filename: (req, file, cb) => {
    const tempFileName = `${randomUUID()}${path.extname(file.originalname) || ".png"}`;
    cb(null, tempFileName)
  },
});

const upload = multer({ storage });


// 画像の登録
router.post("/upload", upload.single("file"), async (req, res) => {
    const { tempPath } = req.file.path;
    const result = await createImage(tempPath);
    return handleResult( result, (res, data) => 
      res.status(201).location(`/images/${data}`).end(), res);
  }
);

// 画像の取得
router.get("/:imageId", async (req, res) => {
    const imageId = convertId(req.params.imageId);
    const result = await getImage(imageId);
    return handleResult( result, (res, data) => res.sendFile(data), res);
  }
);

router.delete("/:imageId", async (req, res) => {
    const imageId = convertId(req.params.imageId);
    const result = await deleteImage(imageId);
    return handleResult( result, (res, data) => res.status(204).end(), res);
  }
);

export default router;
