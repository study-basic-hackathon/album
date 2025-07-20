export async function unwrap(result) {
  const { data, error } = await result;
  if (error) throw error;
  return data;
};