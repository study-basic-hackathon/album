import * as imageRepository from "../repositories/image.js";

export async function createImage({ fileInfo }) {
  const { tempPath } = fileInfo;
  const imageId = await imageRepository.insertRecord();
  const uploadFileName = imageRepository.nameFile(imageId, tempPath);
  const result = await imageRepository.moveFile(tempPath, uploadFileName);
  return result;
}

//画像の取得
export async function getImageById(imageId) {
  const result = imageRepository.findImageById(imageId);
  return result;
}

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
