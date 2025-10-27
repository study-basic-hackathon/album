export function isValidName(name) {
  if (!name || typeof name !== "string") {
    return false;
  }
  return !/[<>{}[\]|\\^`$"'=]/.test(name);
}

export function isValidId(id) {
  if (id === null || id === undefined) {
    return false;
  }
  if (typeof id !== "string" && typeof id !== "number") {
    return false;
  }
  return /^[0-9]+$/.test(String(id));
}

export function isValidIds(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return false;
  }
  return arr.every(isValidId);
}

export function isValidDate(dateStr) {
  if (typeof dateStr !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && date.toISOString().startsWith(dateStr);
}


const allowedMimeTypes = new Set(["image/jpeg", "image/png"]);

export function isValidFile(file) {
  if (!file || typeof file !== "object") {
    return false;
  }
  return isValidBuffer(file.buffer) && isValidMimeType(file.mimetype);
}

function isValidBuffer(buffer) {
  return Buffer.isBuffer(buffer) && buffer.length > 0;
}

function isValidMimeType(mimeType) {
  return typeof mimeType === "string" && allowedMimeTypes.has(mimeType);
}
