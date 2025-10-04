import * as imageRecordRepository from "../repositories/image/imageRecord.js";
import * as imageFileRepository from "../repositories/image/imageFile.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

// 画像の登録
export async function createImage(file) {
  const invalidKeys = getInvalidKeys(file);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const id = await imageRecordRepository.createRecord();
  if (id.isFailure()) {
    return id;
  }

  const saving = await imageFileRepository.saveImage(id.data, file);
  if (saving.isFailure()) {
    return saving;
  }
  return id;
}

//画像の取得
export async function getImage(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await imageFileRepository.findImage(id);
}

//画像の削除
export async function deleteImage(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const filePath = await imageFileRepository.findImage(id);
  if (filePath.isFailure()) {
    return filePath;
  }

  const deleting = await imageRecordRepository.deleteRecord(id);
  if (deleting.isFailure()) {
    return deleting;
  }
  return await imageFileRepository.removeImage(filePath.data);
}
