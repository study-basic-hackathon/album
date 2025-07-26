import multer from "multer";
import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { tempDir, uploadDir } from "../commons/dirPaths";

fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".png";
    const tempFileName = `${randomUUID()}${ext}`;
    req.tempFilename = tempFileName;
    cb(null, tempFileName);
  },
});

export const upload = multer({ storage });
