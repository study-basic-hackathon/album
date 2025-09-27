import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId } from "../util/index.js";

export function convertArrangerPayload(payload) {
  if (!isValidName(payload.name)) {
    return Result.fail(AppError.validationError("Invalid Name"));
  }
  return Result.ok({
    name: payload.name,
  });
}

export function convertArrangerId(params) {
  if (!isValidId(params.arrangerId)) {
    return Result.fail(AppError.validationError("Invalid arrangerId"));
  }
  return Result.ok({
    arrangerId: params.arrangerId,
  });
}

export function convertArrangerAndWorkIds(params) {
  if (!isValidId(params.arrangerId)) {
    return Result.fail(AppError.validationError("Invalid arrangerId"));
  }
  if (!isValidId(params.workId)) {
    return Result.fail(AppError.validationError("Invalid workId"));
  }
  return Result.ok({
    arrangerId: params.arrangerId,
    workId: params.workId,
  });
}
