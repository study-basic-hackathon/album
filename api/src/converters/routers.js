export function convertId(Id) {
  if (!/^[0-9]+$/.test(Id)) {
    return null;
  }
  return Id;
}