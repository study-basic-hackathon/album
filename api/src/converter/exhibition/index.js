import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidName, isValidId, isValidDate } from "../util/index.js";

export function convertExhibitionPayload(payload) {
  if (!isValidName(payload.name)) {
    return Result.fail(AppError.validationError("Invalid Name"));
  }
  if (!isValidDate(payload.started_date) || !isValidDate(payload.ended_date)) {
    return Result.fail(AppError.validationError("Invalid Date"));
  }
  if (new Date(payload.started_date) > new Date(payload.ended_date)) {
    return Result.fail(AppError.validationError("started_date must be before ended_date"));
  }
  return Result.ok({
    name: payload.name,
    started_date: payload.started_date,
    ended_date: payload.ended_date,
  });
}

export function convertExhibitionId(params) {
  if (!isValidId(params.exhibitionId)) {
    return Result.fail(AppError.validationError("Invalid exhibitionId"));
  }
  return Result.ok({
    exhibitionId: params.exhibitionId,
  });
}

export function convertExhibitionAndWorkIds(params) {
  if (!isValidId(params.exhibitionId)) {
    return Result.fail(AppError.validationError("Invalid exhibitionId"));
  }
  if (!isValidId(params.workId)) {
    return Result.fail(AppError.validationError("Invalid workId"));
  }
  return Result.ok({
    exhibitionId: params.exhibitionId,
    workId: params.workId,
  });
}
