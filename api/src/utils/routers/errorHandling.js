export async function unwrap(promise) {
  const { data, error } = await promise;
  if (error) throw error;
  return data;
}
