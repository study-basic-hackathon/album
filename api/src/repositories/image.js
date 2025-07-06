import { pool } from "../db.js";
import path from 'path';
import { promises as fs } from 'fs';
import { noRecord, success, rollbackError } from '../utils/image.js'

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

export async function deleteImageTransaction(imageId, filePath){
  let client; 
  try {
    client = await pool.connect();
    await client.query('BEGIN');

    // レコードを削除
    const result = await client.query(
    `DELETE FROM
      images
    WHERE
      id = $1`,
     [imageId]
    );

    if (result.rowCount === 0) {
      await client.query('ROLLBACK');
      console.warn(`image record not found`);
      return noRecord;
    }

    // ファイルを削除
    await fs.unlink(filePath);
    await client.query('COMMIT');
    return success;

  } catch (error) {
    console.error(`Error:`, error);

    // ロールバック時にエラーが生じる可能性もある
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error(`Error during rollback:`, rollbackError);
      }
    }
    return rollbackError;
  } finally {
    if (client) {
      client.release();
    }
  }
};