export function convertId(id) {
  if (!/^[0-9]+$/.test(id)) {
    return null;
  }
  return id;
}

export function convertFile(file) {
  if (!file) {
    return { file: null };
  }
  return {
    file: {
      buffer: file.buffer,
      originalName: file.originalName,
    },
  };
}
