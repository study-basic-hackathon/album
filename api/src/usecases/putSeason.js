import { putSeason } from '../repositories/putSeason.js';

// 季節の更新
export async function putSeason(seasonId, name) {
  const result = await putSeason(seasonId, name);
  return result[0];
};

