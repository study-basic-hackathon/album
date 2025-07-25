import { pool } from "../db.js";
import path from "path";
import { promises as fs } from "fs";
import Result from "../utils/commons/Result.js";
import { InternalError, NotFoundError } from "../utils/commons/AppError.js";

const UPLAODS_DIRECTORY = process.env.UPLAODS_DIRECTORY || "uploads";

function getUploadsDirectoryPath() {
  return path.resolve(UPLAODS_DIRECTORY);
}

export async function insertImage() {
  const result = await pool.query(
    `
    INSERT INTO
       image (created_at)
     VALUES
       (NOW())
     RETURNING
       id
    `,
    []
  );
  return result.rows;
}

export function findImageById(imageId) {
  const uploadDir = getUploadsDirectoryPath();
  const files = fs.readdirSync(uploadDir);
  const foundFileName = files.find((file) => path.parse(file).name === imageId);
  if (foundFileName === undefined) {
    return undefined;
  }
  const filePath = path.join(uploadDir, foundFileName);
  return filePath;
}

export async function findByParams(imageId, dirPath) {
  try {
    const files = await fs.readdir(dirPath);
    const file = files.find((file) => path.parse(file).name === imageId);
    if (!file) return Result.fail(new NotFoundError());
    return Result.ok(path.join(dirPath, file));
  } catch (err) {
    console.error(err);
    return Result.fail(new InternalError());
  }
}

export async function deleteRecord(imageId) {
  try {
    await pool.query(`DELETE FROM image WHERE id = $1`, [imageId]);
    return Result.ok("");
  } catch (err) {
    console.error(err);
    return Result.fail(new InternalError());
  }
}

export async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    return Result.ok("");
  } catch (err) {
    console.error(err);
    return Result.fail(new InternalError());
  }
}
