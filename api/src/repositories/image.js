import { pool } from "../db.js";
import path from 'path';
import fs from 'fs';

const UPLAODS_DIRECTORY = process.env.UPLAODS_DIRECTORY || "uploads";

function getUploadsDirectoryPath() {
  return path.resolve(UPLAODS_DIRECTORY);
};

export async function insertImage(){
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
};

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
