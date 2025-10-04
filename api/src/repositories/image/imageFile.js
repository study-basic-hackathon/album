import path from "path";
import fs from "fs/promises";
import Result from "../../utils/Result.js";
import AppError from "../../utils/AppError.js";
import { getUploadDir } from "../utils/getUploadDir.js";

export async function saveImage(id, file) {
  try {
    const uploadDir = getUploadDir();
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${id}${path.extname(file.originalName)}`;
    const uploadPath = path.join(uploadDir, fileName);
    await fs.writeFile(uploadPath, file.buffer);
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function findImage(id) {
  try {
    const { imageId } = id;
    const uploadDir = getUploadDir();
    const files = await fs.readdir(uploadDir);
    const file = files.find((file) => path.parse(file).name === imageId);

    if (!file) {
      return Result.fail(AppError.notFound("File not found"));
    }

    const filePath = path.join(uploadDir, file);
    return Result.ok(filePath);
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}

export async function removeImage(filePath) {
  try {
    await fs.unlink(filePath);
    return Result.ok();
  } catch (err) {
    console.error(err);
    return Result.fail(AppError.internalError());
  }
}
