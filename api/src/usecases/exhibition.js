import * as exhibitionRepository from "../repositories/exhibition.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

// 華展の一覧
export async function getExhibitions() {
  return await exhibitionRepository.findAllExhibitions();
}

// 華展の登録
export async function createExhibition(payload) {
  const invalidKeys = getInvalidKeys(payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await exhibitionRepository.createExhibition(payload);
}

// 華展の取得
export async function getExhibitionById(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await exhibitionRepository.findExhibition(id);
}

// 華展の作品一覧の取得
export async function getExhibitionWorks(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await exhibitionRepository.findWorks(id);
}

// 華展の特定の作品の取得
export async function getExhibitionWorkById(ids) {
  const invalidKeys = getInvalidKeys(ids);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const exhibitionWorks = await exhibitionRepository.findWorks(ids);

  if (exhibitionWorks.isFailure()) {
    return exhibitionWorks;
  }
  return await exhibitionRepository.findWork(exhibitionWorks.data, ids);
}

// 華展の更新
export async function updateExhibition(id, payload) {
  const invalidKeys = getInvalidKeys(id, payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await exhibitionRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await exhibitionRepository.updateExhibition(id, payload);
}

// 華展の削除
export async function deleteExhibition(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await exhibitionRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await exhibitionRepository.deleteExhibition(id);
}
