import path from 'path';
import fs from 'fs';

export function findImageById(imageId) {
  const uploadDir = path.resolve("upload");
  const files = fs.readdirSync(uploadDir);
  const foundFileName = files.find((file) => path.parse(file).name === imageId);
  if (foundFileName === undefined) {
    return undefined;
  };
  const filePath = path.join(uploadDir, foundFileName);
    return filePath;
};