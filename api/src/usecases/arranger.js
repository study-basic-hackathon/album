import { findArrangerById, findWorksByCondition } from '../repositories/index.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 作者の情報の取得
export async function getArrangerById(arrangerId) {
    const result = await findArrangerById(arrangerId);
    return result;
  };

// 作者の作品一覧の取得
export async function getArrangerWorks(arrangerId) {
    const result = await findWorksByCondition({
      whereClause: "wk.arranger_id = $1",
      whereParams: [arrangerId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedResults = formatWorksWithNavigation(result);
    return formattedResults;
  };

// 作者の特定の作品の取得
export async function getArrangerWorkById(arrangerId, workId) {
    const targetWorkId = parseInt(workId, 10);
    const result = await findWorksByCondition({
      whereClause: "wk.arranger_id = $1",
      whereParams: [arrangerId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
    return foundWork;
};