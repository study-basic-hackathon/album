import express from "express";
import { getImageById, removeImage, getDirPath, getImageFilePathIfExists } from '../usecases/image.js';
import { NotFoundError, ValidationError, InternalError } from "../utils/commons/AppError.js";

const router = express.Router();

// 画像の取得
router.get("/:imageId", async (req, res) => {
    try{
      const { imageId } = req.params;
      if (!/^\d+$/.test(imageId)) {
        return res.status(400).json({ message: "Invalid imageId" });
      };
      const result = await getImageById(imageId);
      if (result === undefined) {
        return res.status(404).json({ message: "Resource not found" });
      };
      res.sendFile(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
    };
});

router.delete("/:imageId", async (req, res) => {
  const { imageId } = req.params;
  try {
    if (!/^\d+$/.test(imageId)) {
      throw new ValidationError("Invalid imageId");
    }

    const dirPath = getDirPath();
    const fileResult = await getImageFilePathIfExists(imageId, dirPath);
    if (fileResult.isFailure()) throw fileResult.error;

    const result = await removeImage(imageId, fileResult.data);
    if (result.isFailure()) throw result.error;

    return res.status(204).end();

  } catch (error) {
    console.error("Delete image error", error);

    switch (true){
      case error instanceof ValidationError:
        return res.status(400).json({ error: error.message });
      case error instanceof NotFoundError:
        return res.status(404).json({ error: error.message });
      case error instanceof InternalError:
      default:
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

export default router;