import * as workRepository from "../repositories/work.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

// 作品の登録
export async function createWork(payload) {
  const invalidKeys = getInvalidKeys(payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await workRepository.createWork(payload);
}

// 作品の更新
export async function updateWork(id, payload) {
  const invalidKeys = getInvalidKeys(id, payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await workRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await workRepository.updateWork(id, payload);
}

// 作品の削除
export async function deleteWork(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await workRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await workRepository.deleteWork(id);
}
