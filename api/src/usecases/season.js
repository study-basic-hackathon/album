import * as seasonRepository from "../repositories/season.js";

//季節の登録
export async function createSeason(payload) {
  return await seasonRepository.createSeason(payload);
}

// 季節の情報の取得
export async function getSeasonById(id) {
  return await seasonRepository.findSeason(id);
}

// 季節の作品一覧の取得
export async function getSeasonWorks(id) {
  return await seasonRepository.findWorks(id);
}

// 季節の特定の作品の取得
export async function getSeasonWorkById(ids) {
  const seasonWorks = await seasonRepository.findWorks(ids);

  if (seasonWorks.isFailure()) {
    return seasonWorks;
  }
  return await seasonRepository.findWork(seasonWorks.data, ids);
}

// 季節の更新
export async function updateSeason(id, payload) {
  const existing = await seasonRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await seasonRepository.updateSeason(id, payload);
}

// 季節の削除
export async function deleteSeason(id) {
  const existing = await seasonRepository.ensureRecord(id);
  if (existing.isFailure()) {
    return existing;
  }
  return await seasonRepository.deleteSeason(id);
}
