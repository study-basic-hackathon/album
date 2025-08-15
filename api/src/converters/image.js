import path from "path";

export function convertId(id) {
  if (!/^[0-9]+$/.test(id)) {
    return null;
  }
  return id;
}

const allowedMimeTypes = {
  "image/jpeg": ".jpeg",
  "image/png": ".png",
};

function isValidFile(file) {
  return !!(file
    && allowedMimeTypes[file.mimetype]
    && file.buffer
    && file.originalName);
}

export function convertFile(file) {
  if (!isValidFile(file)) {
    return { file: null };
  }
  const ext = allowedMimeTypes[file.mimetype];
  const baseName = path.parse(file.originalName).name;

  return {
    file: {
      buffer: file.buffer,
      mimetype: file.mimetype,
      filename: `${baseName}${ext}`,
    },
  };
}
