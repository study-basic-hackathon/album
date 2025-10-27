import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId } from "../util/index.js";

export function convertCategoryPayload(payload) {
  if (!isValidName(payload.name)) {
    return Result.fail(AppError.validationError("Invalid Name"));
  }
  return Result.ok({
    name: payload.name,
  });
}

export function convertCategoryId(params) {
  if (!isValidId(params.categoryId)) {
    return Result.fail(AppError.validationError("Invalid categoryId"));
  }
  return Result.ok({
    categoryId: params.categoryId,
  });
}

export function convertCategoryAndWorkIds(params) {
  if (!isValidId(params.categoryId)) {
    return Result.fail(AppError.validationError("Invalid categoryId"));
  }
  if (!isValidId(params.workId)) {
    return Result.fail(AppError.validationError("Invalid workId"));
  }
  return Result.ok({
    categoryId: params.categoryId,
    workId: params.workId,
  });
}
