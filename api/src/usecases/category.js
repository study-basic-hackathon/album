import { findCategoryById, findWorksByCategoryId } from '../repositories/category.js';

// カテゴリーの情報の取得
export async function getCategoryById(categoryId) {
  const result = await findCategoryById(categoryId);
  return result[0];
};

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(categoryId) {
  const result = await findWorksByCategoryId(categoryId);
  return result;
};

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(categoryId, workId) {
  const targetWorkId = parseInt(workId, 10);
  const formattedWorks = await findWorksByCategoryId(categoryId);
  const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
  return foundWork[0];
};