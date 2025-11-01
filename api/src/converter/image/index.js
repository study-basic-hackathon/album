import path from "path";
import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { isValidId, isValidFile } from "../util/index.js";

export function convertFile(file) {
  if (!isValidFile(file)) {
    return Result.fail(AppError.validationError("Invalid File"));
  }
  const ext = file.mimetype.split("/")[1];
  const extension = "." + ext;
  const baseName = path.parse(file.originalname).name;

  return Result.ok({
    file: {
      buffer: file.buffer,
      mimetype: file.mimetype,
      originalName: `${baseName}${extension}`,
    },
  });
}

export function convertImageId(params) {
  if (!isValidId(params.imageId)) {
    return Result.fail(AppError.validationError("Invalid imageId"));
  }
  return Result.ok({
    imageId: params.imageId,
  });
}
