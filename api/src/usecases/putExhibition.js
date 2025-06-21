import { PutExhibition } from '../repositories/putExhibition.js';

// 華展の更新
export async function putExhibition(exhibitionId, name, started_date, ended_date) {
  const result = await PutExhibition(exhibitionId, name, started_date, ended_date);
  return result;
};
