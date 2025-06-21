import { findPutExhibitions } from '../repositories/exhibition.js';

// 華展の更新
export async function putExhibitions(exhibitionId, name, started_date, ended_date) {
  const result = await findPutExhibitions(exhibitionId, name, started_date, ended_date);
  return result;
};
