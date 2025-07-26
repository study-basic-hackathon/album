import express from "express";
import {
  getImageById,
  createImage,
  getImageFilePath,
  deleteImageFile,
  deleteImageRecord,
} from "../usecases/image.js";
import { NotFoundError, ValidationError } from "../utils/commons/AppError.js";
import { unwrap } from "../utils/routers/errorHandling.js";
import { upload } from "../utils/routers/multer.js";
import { uploadDir } from "../utils/commons/dirPaths.js";

const router = express.Router();

// 画像の登録
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const fileInfo = { tempPath: req.file.path };
    const result = await createImage(fileInfo);
    res.status(201).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 画像の取得
router.get("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    if (!/^\d+$/.test(imageId)) {
      return res.status(400).json({ message: "Invalid imageId" });
    }
    const result = await getImageById(imageId);
    if (result === undefined) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.sendFile(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:imageId", async (req, res, next) => {
  try {
    const { imageId } = req.params;
    if (!/^\d+$/.test(imageId)) {
      throw new ValidationError("Invalid imageId");
    }

    const filePath = await unwrap(getImageFilePath(imageId, uploadDir));
    await unwrap(deleteImageFile(filePath));
    await unwrap(deleteImageRecord(imageId));

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message });
  }

  return res.status(500).json({ error: "Internal Server Error" });
});

export default router;
