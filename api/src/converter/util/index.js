// NameValidation
export function toAcceptedName(value) {
  return isValidName(value) ? value : null;
}

function isValidName(name) {
  if (!name || typeof name !== "string") {
    return false;
  }
  return !/[<>{}[\]|\\^`$"'=]/.test(name);
}

// IdValidation
export function toAcceptedId(value) {
  return isValidId(value) ? value : null;
}

export function toAcceptedIds(values) {
  return isValidIds(values) ? values : null;
}

function isValidId(id) {
  if (id === null || id === undefined) {
    return false;
  }
  if (typeof id !== "string" && typeof id !== "number") {
    return false;
  }
  return /^[0-9]+$/.test(String(id));
}

function isValidIds(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return false;
  }
  return arr.every(isValidId);
}

// DateValidation
export function toAcceptedDate(value) {
  return isValidDate(value) ? value : null;
}

function isValidDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") {
    return false;
  }
  if (isNaN(new Date(dateStr).getTime())) {
    return false;
  }
  return true;
}

// FileValidation
export function toAcceptedFile(value) {
  return isValidFile(value) ? value : null;
}

function isValidFile(buffer) {
  if (!buffer) {
    return false;
  }
  if (buffer instanceof Buffer && buffer.length > 0) {
    return true;
  }
  return false;
}

// MimeTypeValidation
export function toAcceptedMimeType(value) {
  return isValidMimeType(value) ? value : null;
}

function isValidMimeType(mimeType) {
  if (!mimeType || typeof mimeType !== "string") {
    return false;
  }
  const allowedMimetypes = {
    "image/jpeg": true,
    "image/png": true,
  };
  return !!allowedMimetypes[mimeType];
}
