import express from "express";
import { getImageById } from '../usecases/image.js';

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

export default router;