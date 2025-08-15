import { pool } from "../db.js";
import path from "path";
import fs from "fs/promises";
import Result from "../utils/commons/Result.js";
import AppError from "../utils/commons/AppError.js";
import { getUploadDir } from "../utils/commons/getDir.js";

export async function insertImage() {
  try {
    const result = await pool.query(
      `
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

export async function saveFile(imageId, file) {
  try {
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

export async function findById(imageId) {
  try {
    const uploadDir = getUploadDir();
    const files = await fs.readdir(uploadDir);
    const file = files.find((file) => path.parse(file).name === imageId);

    if (!file) {
      return Result.fail(AppError.notFound());
    }

    const filePath = path.join(uploadDir, file);
    return Result.ok(filePath);
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function deleteRecord(imageId) {
  try {
    const result = await pool.query(`DELETE FROM image WHERE id = $1`, [imageId]);
    if (result.rowCount === 0) {
      return Result.fail(AppError.internalError());
    }
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.sqlError());
  }
}

export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}
