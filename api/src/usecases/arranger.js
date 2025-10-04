import * as arrangerRepository from "../repositories/arranger.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

// 作者の登録
export async function createArranger(payload) {
  const invalidKeys = getInvalidKeys(payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await arrangerRepository.createArranger(payload);
}

// 作者の情報の取得
export async function getArrangerById(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await arrangerRepository.findArranger(id);
}

// 作者の作品一覧の取得
export async function getArrangerWorks(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await arrangerRepository.findWorks(id);
}

// 作者の特定の作品の取得
export async function getArrangerWorkById(ids) {
  const invalidKeys = getInvalidKeys(ids);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const arrangerWorks = await arrangerRepository.findWorks(ids);

  if (arrangerWorks.isFailure()) {
    return arrangerWorks;
  }
  return await arrangerRepository.findWork(arrangerWorks.data, ids);
}

// 作者の更新
export async function updateArranger(id, payload) {
  const invalidKeys = getInvalidKeys(id, payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await arrangerRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await arrangerRepository.updateArranger(id, payload);
}

// 作者の削除
export async function deleteArranger(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await arrangerRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await arrangerRepository.deleteArranger(id);
}
