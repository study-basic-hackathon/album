import { findSeasonById, findWorksBySeasonId, insertSeason } from '../repositories/season.js';
import * as seasonRepository from '../repositories/season.js';

//季節の登録
export async function createSeason(payloadResult) {
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  return await insertSeason(payloadResult);
};

// 季節の情報の取得
export async function getSeasonById(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findSeasonById(idResult);
};

// 季節の作品一覧の取得
export async function getSeasonWorks(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  return await findWorksBySeasonId(idResult);
};

// 季節の特定の作品の取得
export async function getSeasonWorkById(idsResult) {
  if (idsResult.isFailure()) {
    return idsResult;
  }
  const workListResult = await findWorksBySeasonId(idsResult);

  if(workListResult.isFailure()) {
    return workListResult;
  }
  return await seasonRepository.getWork(workListResult, idsResult);
}

// 季節の更新
export async function updateSeason(idResult, payloadResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  if (payloadResult.isFailure()) {
    return payloadResult;
  }
  const exsitingResult = await seasonRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await seasonRepository.updateSeason(idResult, payloadResult);
};

// 季節の削除
export async function deleteSeason(idResult) {
  if (idResult.isFailure()) {
    return idResult;
  }
  const exsitingResult = await seasonRepository.ensureRecordExists(idResult);
  if (exsitingResult.isFailure()) {
    return exsitingResult;
  }
  return await seasonRepository.deleteSeason(idResult);
}