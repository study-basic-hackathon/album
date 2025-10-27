import * as arrangerRepository from "../repositories/arranger.js";

// 作者の登録
export async function createArranger(payload) {
  return await arrangerRepository.createArranger(payload);
}

// 作者の情報の取得
export async function getArrangerById(id) {
  return await arrangerRepository.findArranger(id);
}

// 作者の作品一覧の取得
export async function getArrangerWorks(id) {
  return await arrangerRepository.findWorks(id);
}

// 作者の特定の作品の取得
export async function getArrangerWorkById(ids) {
  const arrangerWorks = await arrangerRepository.findWorks(ids);

  if (arrangerWorks.isFailure()) {
    return arrangerWorks;
  }
  return await arrangerRepository.findWork(arrangerWorks.data, ids);
}

// 作者の更新
export async function updateArranger(id, payload) {
  const existing = await arrangerRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await arrangerRepository.updateArranger(id, payload);
}

// 作者の削除
export async function deleteArranger(id) {
  const existing = await arrangerRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await arrangerRepository.deleteArranger(id);
}
