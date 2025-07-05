import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { getImageById, createImage } from '../usecases/image.js';

const router = express.Router();

const uploadDir = path.resolve("./uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const imageId = req.imageId;
    const ext = path.extname(file.originalname) || ".png";
    const filename = `${imageId}${ext}`;
    cb(null, filename);
  },
});

const uploadImage = multer({ storage });

// 画像の登録
router.post("/", async (req, res, next) => {
  try{
    const imageId = await createImage();
    req.imageId = imageId
    next();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
    };
  }, uploadImage.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Invalid file" });
    }
    const imageId = req.imageId;
    res.status(201).header("Location", `/images/${imageId}`).end();
});

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