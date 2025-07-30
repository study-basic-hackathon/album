import { pool } from "../db.js";
import path from "path";
import { promises as fs } from "fs";
import Result from "../utils/commons/Result.js";
import AppError from "../utils/commons/AppError.js";
import { uploadDir } from "../utils/commons/dirPaths.js";

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

export function nameFile(imageId, tempPath) {
  try {
    const ext = path.extname(tempPath);
    const uploadFileName = `${imageId}${ext}`;
    return Result.ok(uploadFileName);
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function moveFile(tempPath, uploadFileName) {
  try {
    const uploadPath = path.join(uploadDir, uploadFileName);
    await fs.rename(tempPath, uploadPath);
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function findById(imageId) {
  try {
    const files = await fs.readdir(uploadDir);
    const file = files.find((file) => path.parse(file).name === imageId);

    if (!file) {
      return Result.fail(AppError.notFound());
    }

    const filePath = path.join(uploadDir, file)
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
