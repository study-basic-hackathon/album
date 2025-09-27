import { findCategoryById, findWorksByCategoryId, insertCategory } from '../repositories/category.js';
import * as categoryRepository from '../repositories/category.js';

//カテゴリの登録
export async function createCategory(payloadResult) {
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  return await insertCategory(payloadResult);
}

// カテゴリーの情報の取得
export async function getCategoryById(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findCategoryById(idResult);
}

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findWorksByCategoryId(idResult);
}

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(idsResult) {
  if (idsResult.isFailure()) {
    return idsResult;
  }
  const workListResult = await findWorksByCategoryId(idsResult);

  if(workListResult.isFailure()) {
    return workListResult;
  }
  return await categoryRepository.getWork(workListResult, idsResult);
}

// カテゴリの更新
export async function updateCategory(idResult, payloadResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  const exsistingResult = await categoryRepository.ensureRecordExists(idResult);
  if (exsistingResult.isFailure()) {
    return exsistingResult;
  }
  return await categoryRepository.updateCategory(idResult, payloadResult);
}

// カテゴリの削除
export async function deleteCategory(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const exsistingResult = await categoryRepository.ensureRecordExists(idResult);
  if (exsistingResult.isFailure()) {
    return exsistingResult;
  }
  return await categoryRepository.deleteCategory(idResult);
}