import { findSeasonById, findWorksBySeasonId, postSeason } from '../repositories/season.js';
import * as seasonRepository from '../repositories/season.js';

//作者の登録
export async function getSeasonPath(name) {
  const resultRows = await postSeason(name);
  const seasonId = resultRows[0].id;
  const path = `/seasons/${seasonId}`;
  return path;
};

// 季節の情報の取得
export async function getSeasonById(seasonId) {
  const result = await findSeasonById(seasonId);
  return result[0];
};

// 季節の作品一覧の取得
export async function getSeasonWorks(seasonId) {
  const result = await findWorksBySeasonId(seasonId);
  return result;
};

// 季節の特定の作品の取得
export async function getSeasonWorkById(seasonId, workId) {
  const targetWorkId = parseInt(workId, 10);
  const formattedWorks = await findWorksBySeasonId(seasonId);
  const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
  return foundWork[0];
};

// 季節の更新
export async function updateSeason(seasonId, name) {
  const result = await seasonRepository.updateSeason(seasonId, name);
  return result[0];
};

// 季節の削除
export async function deleteSeason(seasonId) {
  const result = await seasonRepository.deleteSeason(seasonId);
  return result;
}