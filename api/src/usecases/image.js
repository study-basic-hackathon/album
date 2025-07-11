import path from 'path';
import { promises as fs } from 'fs';
import { NotFoundError } from '../utils/commons/AppError.js';
import * as imageRepository from '../repositories/image.js'
import { findImageById } from '../repositories/image.js';
import Result from '../utils/commons/Result.js';

//ファイルパスの取得
export function getDirPath() {
  return path.resolve("./uploads");
};

//画像の有無の確認
export async function getImageFilePathIfExists(imageId, dirPath) {
  const files = await fs.readdir(dirPath);
  const file = files.find(file => path.parse(file).name === imageId);
  if (!file) {
    return Result.fail(new NotFoundError('File not found'));
  }
  return Result.ok(path.join(dirPath, file));
} 

//画像の取得
export async function getImageById(imageId) {
  const result = findImageById(imageId);
  return result; 
};

//画像の削除
export async function removeImage(imageId, filePath) {
  return await imageRepository.deleteImage(imageId, filePath);
};