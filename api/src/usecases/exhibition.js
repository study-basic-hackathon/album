import { findAllExhibitions, findExhibitionById, findWorksByExhibitionId } from '../repositories/exhibition.js';
import * as exhibitionRepository from '../repositories/exhibition.js';

// 華展の一覧
export async function getExhibitions() {
  const result = await findAllExhibitions();
  return result;
};

// 華展の取得
export async function getExhibitionById(exhibitionId) {
  const result = await findExhibitionById(exhibitionId);
  return result[0];
};

// 華展の作品一覧の取得
export async function getExhibitionWorks(exhibitionId) {
  const result = await findWorksByExhibitionId(exhibitionId);
  return result;
};

// 華展の特定の作品の取得
export async function getExhibitionWorkById(exhibitionId, workId) {
  const targetWorkId = parseInt(workId, 10);
  const formattedWorks = await findWorksByExhibitionId(exhibitionId);
  const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
  return foundWork[0];
};

// 華展の更新
export async function updateExhibition(exhibitionId, name, started_date, ended_date) {
  const result = await exhibitionRepository.updateExhibition(exhibitionId, name, started_date, ended_date);
  return result;
};