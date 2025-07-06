import path from 'path';
import { promise as fs } from 'fs';
import { noFile } from '../utils/image.js'
import { findImageById, deleteImageTransaction } from '../repositories/image.js';

//ファイルパスの取得
export function getDirPath() {
  return path.resolve("./uploads");
};

//画像の取得
export async function getImageById(imageId) {
  const result = findImageById(imageId);
  return result; 
};

//画像の削除
export async function deleteImage(imageId, dirPath) {
  const files = fs.readdirSync(dirPath);
  const file = files.find(file => path.parse(file).name === imageId);
  if (!file) {
    return noFile;
  }
  const filePath = path.join(dirPath, file);
  return await deleteImageTransaction(imageId, filePath);
};