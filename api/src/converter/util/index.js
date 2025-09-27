const allowedMinetypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
};

export function isValidName(name) {
  return name && !/[<>{}[\]|\\^`$"'=]/.test(name);
}

export function isValidId(id) {
  return /^[0-9]+$/.test(id);
}

export function isValidDate(dateStr) {
  if (!dateStr) {
    return false;
  }
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  return true;
}

export function isValidFile(file) {
  if (!file || !allowedMinetypes[file.mimetype]) {
    return false;
  }
  return true;
}