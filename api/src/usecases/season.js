import * as seasonRepository from "../repositories/season.js";
import Result from "../utils/Result.js";
import AppError from "../utils/AppError.js";
import { getInvalidKeys } from "./utils/getInvalidKeys.js";

//季節の登録
export async function createSeason(payload) {
  const invalidKeys = getInvalidKeys(payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await seasonRepository.createSeason(payload);
}

// 季節の情報の取得
export async function getSeasonById(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await seasonRepository.findSeason(id);
}

// 季節の作品一覧の取得
export async function getSeasonWorks(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  return await seasonRepository.findWorks(id);
}

// 季節の特定の作品の取得
export async function getSeasonWorkById(ids) {
  const invalidKeys = getInvalidKeys(ids);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const seasonWorks = await seasonRepository.findWorks(ids);

  if (seasonWorks.isFailure()) {
    return seasonWorks;
  }
  return await seasonRepository.findWork(seasonWorks.data, ids);
}

// 季節の更新
export async function updateSeason(id, payload) {
  const invalidKeys = getInvalidKeys(id, payload);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const exsiting = await seasonRepository.ensureRecord(id);
  if (exsiting.isFailure()) {
    return exsiting;
  }
  return await seasonRepository.updateSeason(id, payload);
}

// 季節の削除
export async function deleteSeason(id) {
  const invalidKeys = getInvalidKeys(id);

  if (invalidKeys.length > 0) {
    return Result.fail(AppError.validationError(`Invalid keys: ${invalidKeys.join(", ")}`));
  }
  const exsiting = await seasonRepository.ensureRecord(id);
  if (exsiting.isFailure()) {
    return exsiting;
  }
  return await seasonRepository.deleteSeason(id);
}
