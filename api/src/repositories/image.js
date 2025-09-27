import { pool } from "../db.js";
import path from "path";
import fs from "fs/promises";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getUploadDir } from "./utils/getUploadDir.js";

export async function insertRecord() {
  try {
    const result = await pool.query(`
      INSERT INTO image (created_at)
      VALUES (NOW())
      RETURNING id`,
      []
    );
    return Result.ok(result.rows[0].id);
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.sqlError());
  }
}

export async function saveFile(idResult, fileResult) {
  try {
    const imageId = idResult.data;
    const { file } = fileResult.data;
    const uploadDir = getUploadDir();
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${imageId}${path.extname(file.originalName)}`;
    const uploadPath = path.join(uploadDir, fileName);
    await fs.writeFile(uploadPath, file.buffer);
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function findById(idResult) {
  try {
    const { imageId } = idResult.data;
    const uploadDir = getUploadDir();
    const files = await fs.readdir(uploadDir);
    const file = files.find((file) => path.parse(file).name === imageId);

    if (!file) {
      return Result.fail(AppError.notFound("File not found"));
    }

    const filePath = path.join(uploadDir, file);
    return Result.ok(filePath);
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function deleteRecord(idResult) {
  try {
    const { imageId } = idResult.data;
    const result = await pool.query(`
      DELETE FROM image WHERE id = $1`,
      [imageId]
    );
    if (result.rowCount === 0) {
      return Result.fail(AppError.internalError());
    }
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.sqlError());
  }
}

export async function deleteFile(pathResult) {
  try {
    const filePath = pathResult.data;
    await fs.unlink(filePath);
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}
