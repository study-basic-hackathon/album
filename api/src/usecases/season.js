import { findSeasonById, findWorksByCondition } from '../repositories/index.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 季節の情報の取得
export async function getSeasonById(seasonId) {
    const result = await findSeasonById(seasonId);
    return result;
  };

// 季節の作品一覧の取得
export async function getSeasonWorks(seasonId) {
    const result = await findWorksByCondition({
      whereClause: "wk.season_id = $1",
      whereParams: [seasonId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedResults = formatWorksWithNavigation(result);
    return formattedResults;
  };

// 季節の特定の作品の取得
export async function getSeasonWorkById(seasonId, workId) {
    const targetWorkId = parseInt(workId, 10);
    const result = await findWorksByCondition({
      whereClause: "wk.season_id = $1",
      whereParams: [seasonId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
    return foundWork;
  };
