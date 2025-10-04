import * as categoryRepository from "../repositories/category.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

//カテゴリの登録
export async function createCategory(payload) {
  const invalidKeys = getInvalidKeys(payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await categoryRepository.createCategory(payload);
}

// カテゴリーの情報の取得
export async function getCategoryById(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await categoryRepository.findCategory(id);
}

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await categoryRepository.findWorks(id);
}

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(ids) {
  const invalidKeys = getInvalidKeys(ids);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const categoryWorks = await categoryRepository.findWorks(ids);

  if (categoryWorks.isFailure()) {
    return categoryWorks;
  }
  return await categoryRepository.findWork(categoryWorks.data, ids);
}

// カテゴリの更新
export async function updateCategory(id, payload) {
  const invalidKeys = getInvalidKeys(id, payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await categoryRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await categoryRepository.updateCategory(id, payload);
}

// カテゴリの削除
export async function deleteCategory(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await categoryRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await categoryRepository.deleteCategory(id);
}
