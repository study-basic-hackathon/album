import * as imageRepository from "../repositories/image.js";
import Result from "../utils/commons/Result.js";
import AppError from "../utils/commons/AppError.js";

export async function createImage(file) {
  if (file === null) {
    return Result.fail(AppError.validationError("Invalid ImageFile"));
  }
  const insertResult = await imageRepository.insertRecord();
  if (insertResult.isFailure) {
    return insertResult;
  }
  const imageId = insertResult.data;

  const saveResult = await imageRepository.saveFile(imageId, file);
  if (saveResult.isFailure) {
    return saveResult;
  }
  return insertResult;
}

//画像の取得
export async function getImage(imageId) {
  if (imageId === null) {
    return Result.fail(AppError.validationError("Invalid ImageId"));
  }
  const result = await imageRepository.findById(imageId);
  return result;
}

//画像の削除
export async function deleteImage(imageId) {
  if (imageId === null) {
    return Result.fail(AppError.validationError("Invalid ImageId"));
  }
  const foundPath = await imageRepository.findById(imageId);
  if (foundPath.isFailure) {
    return foundPath;
  }
  const uploadPath = foundPath.data;

  const deleteRecordResult = await imageRepository.deleteRecord(imageId);
  if (deleteRecordResult.isFailure) {
    return deleteRecordResult;
  }
  return await imageRepository.deleteFile(uploadPath);
}
