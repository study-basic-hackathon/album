import { pool } from "../db.js";
import path from 'path';
import { promises as fs } from 'fs';
import Result from "../utils/commons/Result.js";
import { InternalError, NotFoundError } from "../utils/commons/AppError.js";

const UPLAODS_DIRECTORY = process.env.UPLAODS_DIRECTORY || "uploads";

function getUploadsDirectoryPath() {
  return path.resolve(UPLAODS_DIRECTORY);
}

export function findImageById(imageId) {
  const uploadDir = getUploadsDirectoryPath();
  const files = fs.readdirSync(uploadDir);
  const foundFileName = files.find((file) => path.parse(file).name === imageId);
  if (foundFileName === undefined) {
    return undefined;
  };
  const filePath = path.join(uploadDir, foundFileName);
    return filePath;
};

export async function deleteImage(imageId, filePath){
  let client; 
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    // レコードを削除
    const result = await client.query(
    `DELETE FROM image WHERE id = $1`,
     [imageId]
    );

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      return Result.fail(new NotFoundError('Record not found'));
    }

    // ファイルを削除
    try {
      await fs.unlink(filePath);
    } catch (err) {
      await client.query('ROLLBACK');
      return Result.fail(new InternalError('Failed to delete file', err));
    }

    await client.query('COMMIT');
    return Result.ok();

  } catch (err) {
    if (client) await client.query('ROLLBACK');
    return Result.fail(new InternalError('Failed to complete transaction', err));
  } finally {
    if (client) client.release();
  }
};