import { findAllExhibitions, findExhibitionById, findWorksByCondition } from '../repositories/index.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 華展の一覧
export async function getExhibitions() {
    const result = await findAllExhibitions();
    return result;
  };

// 華展の取得
export async function getExhibitionById(exhibitionId) {
    const result = await findExhibitionById(exhibitionId);
    return result;
  };

// 華展の作品一覧の取得
export async function getExhibitionWorks(exhibitionId) {
    const result = await findWorksByCondition({
      whereClause: "wk.exhibition_id = $1",
      whereParams: [exhibitionId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedResults = formatWorksWithNavigation(result);
    return formattedResults;
  };


// 華展の特定の作品の取得
export async function getExhibitionWorkById(exhibitionId, workId) {
    const targetWorkId = parseInt(workId, 10);
    const result = await findWorksByCondition({
      whereClause: "wk.exhibition_id = $1",
      whereParams: [exhibitionId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
    return foundWork;
  };