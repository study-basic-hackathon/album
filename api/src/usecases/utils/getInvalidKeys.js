export function getInvalidKeys(...objs) {
  return objs.flatMap((obj) =>
    Object.entries(obj)
      .filter(([, value]) => value === null)
      .map(([key]) => key)
  );
}
