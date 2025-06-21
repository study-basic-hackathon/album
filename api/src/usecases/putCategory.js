import { putCategory } from '../repositories/putCategory.js';

// カテゴリの更新
export async function putCategory(categoryId, name) {
  const result = await putCategory(categoryId, name);
  return result[0];
};
