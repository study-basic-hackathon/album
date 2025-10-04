import path from "path";
import { toAcceptedId, toAcceptedName, toAcceptedFile, toAcceptedMimeType } from "../util/index.js";

export function convertFile(file) {
  const ext = file.mimetype.split("/")[1];
  const extension = "." + ext;
  const baseName = path.parse(file.originalname).name;

  return {
    buffer: toAcceptedFile(file.buffer),
    mimetype: toAcceptedMimeType(file.mimetype),
    originalName: toAcceptedName(`${baseName}${extension}`),
  };
}

export function convertImageId(params) {
  return {
    imageId: toAcceptedId(params.imageId),
  };
}
