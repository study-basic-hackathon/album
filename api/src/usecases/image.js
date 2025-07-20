import path from "path";
import * as imageRepository from "../repositories/image.js";
import { findImageById, insertImage } from "../repositories/image.js";

//ファイルパスの取得
export function getDirPath() {
  return path.resolve("./uploads");
}

//画像の登録
export async function createImage() {
  const resultRows = await insertImage();
  const imageId = resultRows[0].id;
  return imageId;
}

//画像の取得
export async function getImageById(imageId) {
  const result = await findImageById(imageId);
  return result; 
};

//画像のパス取得
export async function getImageFilePath(imageId, dirPath) {
  const result = imageRepository.findByParams(imageId, dirPath);
  return result;
}

//画像の削除(レコード)
export function deleteImageRecord(imageId) {
  const result = imageRepository.deleteRecord(imageId);
  return result;
}

//画像の削除(ファイル)
export function deleteImageFile(dirPath) {
  const result = imageRepository.deleteFile(dirPath);
  return result;
}
