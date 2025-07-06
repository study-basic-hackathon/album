import express from "express";
import { noRecord, noFile, success, rollbackError } from '../utils/image.js'
import { getImageById, deleteImage, getDirPath } from '../usecases/image.js';

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

// 画像の削除
router.delete("/:imageId", async (req, res) => {
  try {
    const { imageId } = req.params;
    if (!/^[0-9]+$/.test(imageId)) {
      return res.status(400).json({ message: "Invalid imageId" });
    }
    const dirPath = getDirPath();
    const result = await deleteImage(imageId, dirPath);
    const validResults = [noFile, noRecord, success, rollbackError];
    if (!validResults.includes(result)) {
      throw new Error(`Unknown result: ${result}`);
    }    
    if (result === noFile || result === noRecord) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (result === success) {
      return res.status(204).end();
    }
    if (result === rollbackError){
      throw new Error('rollbackError'); 
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  };
});

export default router;