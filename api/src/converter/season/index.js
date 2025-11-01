import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId } from "../util/index.js";

export function convertSeasonPayload(payload) {
  if (!isValidName(payload.name)) {
    return Result.fail(AppError.validationError("Invalid Name"));
  }
  return Result.ok({
    name: payload.name,
  });
}

export function convertSeasonId(params) {
  if (!isValidId(params.seasonId)) {
    return Result.fail(AppError.validationError("Invalid seasonId"));
  }
  return Result.ok({
    seasonId: params.seasonId,
  });
}

export function convertSeasonAndWorkIds(params) {
  if (!isValidId(params.seasonId)) {
    return Result.fail(AppError.validationError("Invalid seasonId"));
  }
  if (!isValidId(params.workId)) {
    return Result.fail(AppError.validationError("Invalid workId"));
  }
  return Result.ok({
    seasonId: params.seasonId,
    workId: params.workId,
  });
}
