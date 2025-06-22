import { findArrangerById, findWorksByArrangerId, updateArranger as updateArrangerRepo } from '../repositories/arranger.js';
// import * as arrangerRepository from '../repositories/arranger.js';

// 作者の情報の取得
export async function getArrangerById(arrangerId) {
  const result = await findArrangerById(arrangerId);
  return result[0];
};

// 作者の作品一覧の取得
export async function getArrangerWorks(arrangerId) {
  const result = await findWorksByArrangerId(arrangerId);
  return result;
};

// 作者の特定の作品の取得
export async function getArrangerWorkById(arrangerId, workId) {
  const targetWorkId = parseInt(workId, 10);
  const formattedWorks = await findWorksByArrangerId(arrangerId);
  const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
  return foundWork[0];
};

// 作者の更新
export async function updateArranger(arrangerId, name) {
  const result = await updateArrangerRepo(arrangerId, name);
  return result[0];
};
