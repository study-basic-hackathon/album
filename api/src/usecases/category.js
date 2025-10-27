import * as categoryRepository from "../repositories/category.js";

//カテゴリの登録
export async function createCategory(payload) {
  return await categoryRepository.createCategory(payload);
}

// カテゴリーの情報の取得
export async function getCategoryById(id) {
  return await categoryRepository.findCategory(id);
}

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(id) {
  return await categoryRepository.findWorks(id);
}

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(ids) {
  const categoryWorks = await categoryRepository.findWorks(ids);

  if (categoryWorks.isFailure()) {
    return categoryWorks;
  }
  return await categoryRepository.findWork(categoryWorks.data, ids);
}

// カテゴリの更新
export async function updateCategory(id, payload) {
  const existing = await categoryRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await categoryRepository.updateCategory(id, payload);
}

// カテゴリの削除
export async function deleteCategory(id) {
  const existing = await categoryRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await categoryRepository.deleteCategory(id);
}
