import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId } from "../util/index.js";

const ids = ["exhibition_id", "arranger_id", "season_id", "category_id"];
const arrayIndex = ["material_ids", "image_ids"];

export function convertWorkPayload(payload) {
  if (!isValidName(payload.title)) {
    return Result.fail(AppError.validationError("Invalid Title"));
  }
  for (const key of ids) {
    if (!isValidId(payload[key])) {
      return Result.fail(AppError.validationError(`Invalid ${key}`));
    }
  }
  for (const key of arrayIndex) {
    if (!Array.isArray(payload[key]) || !payload[key].every((id) => isValidId(id))) {
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
