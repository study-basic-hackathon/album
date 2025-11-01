import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId } from "../util/index.js";

export function convertMaterialPayload(payload) {
  if (!isValidName(payload.name)) {
    return Result.fail(AppError.validationError("Invalid Name"));
  }
  return Result.ok({
    name: payload.name,
  });
}

export function convertMaterialId(params) {
  if (!isValidId(params.materialId)) {
    return Result.fail(AppError.validationError("Invalid materialId"));
  }
  return Result.ok({
    materialId: params.materialId,
  });
}

export function convertMaterialAndWorkIds(params) {
  if (!isValidId(params.materialId)) {
    return Result.fail(AppError.validationError("Invalid materialId"));
  }
  if (!isValidId(params.workId)) {
    return Result.fail(AppError.validationError("Invalid workId"));
  }
  return Result.ok({
    materialId: params.materialId,
    workId: params.workId,
  });
}
