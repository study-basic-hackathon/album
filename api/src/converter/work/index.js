import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId, isValidIds } from "../util/index.js";

const singleIdKeys = ["exhibition_id", "arranger_id", "season_id", "category_id"];
const arrayIdKeys = ["material_ids", "image_ids"];

export function convertWorkPayload(payload) {
  if (!isValidName(payload.title)) {
    return Result.fail(AppError.validationError("Invalid Title"));
  }
  for (const key of singleIdKeys) {
    if (!isValidId(payload[key])) {
      return Result.fail(AppError.validationError(`Invalid ${key}`));
    }
  }
  for (const key of arrayIdKeys) {
    if (!isValidIds(payload[key])) {
      return Result.fail(AppError.validationError(`Invalid ${key}`));
    }
  }
  return Result.ok({
    title: payload.title,
    exhibitionId: payload.exhibition_id,
    arrangerId: payload.arranger_id,
    materialIds: payload.material_ids,
    seasonId: payload.season_id,
    categoryId: payload.category_id,
    imageIds: payload.image_ids,
  });
}

export function convertWorkId(params) {
  if (!isValidId(params.workId)) {
    return Result.fail(AppError.validationError("Invalid workId"));
  }
  return Result.ok({
    workId: params.workId,
  });
}
