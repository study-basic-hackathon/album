import * as exhibitionRepository from "../repositories/exhibition.js";

// 華展の一覧
export async function getExhibitions() {
  return await exhibitionRepository.findAllExhibitions();
}

// 華展の登録
export async function createExhibition(payload) {
  return await exhibitionRepository.createExhibition(payload);
}

// 華展の取得
export async function getExhibitionById(id) {
  return await exhibitionRepository.findExhibition(id);
}

// 華展の作品一覧の取得
export async function getExhibitionWorks(id) {
  return await exhibitionRepository.findWorks(id);
}

// 華展の特定の作品の取得
export async function getExhibitionWorkById(ids) {
  const exhibitionWorks = await exhibitionRepository.findWorks(ids);

  if (exhibitionWorks.isFailure()) {
    return exhibitionWorks;
  }
  return await exhibitionRepository.findWork(exhibitionWorks.data, ids);
}

// 華展の更新
export async function updateExhibition(id, payload) {
  const existing = await exhibitionRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await exhibitionRepository.updateExhibition(id, payload);
}

// 華展の削除
export async function deleteExhibition(id) {
  const existing = await exhibitionRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await exhibitionRepository.deleteExhibition(id);
}
