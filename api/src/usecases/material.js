import * as materialRepository from "../repositories/material.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

// 花材の登録
export async function createMaterial(payload) {
  const invalidKeys = getInvalidKeys(payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await materialRepository.createMaterial(payload);
}

// 花材の情報の取得
export async function getMaterialById(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await materialRepository.findMaterial(id);
}

// 花材の作品一覧の取得
export async function getMaterialWorks(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await materialRepository.findWorks(id);
}

// 花材の特定の作品の取得
export async function getMaterialWorkById(ids) {
  const invalidKeys = getInvalidKeys(ids);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const materialWorks = await materialRepository.findWorks(ids);

  if (materialWorks.isFailure()) {
    return materialWorks;
  }
  return await materialRepository.findWork(materialWorks.data, ids);
}

// 花材の更新
export async function updateMaterial(id, payload) {
  const invalidKeys = getInvalidKeys(id, payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await materialRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await materialRepository.updateMaterial(id, payload);
}

// 花材の削除
export async function deleteMaterial(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const existing = await materialRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await materialRepository.deleteMaterial(id);
}
