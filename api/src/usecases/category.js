import { findCategoryById, findWorksByCondition } from '../repositories/index.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// カテゴリーの情報の取得
export async function getCategoryById(categoryId) {
    const result = await findCategoryById(categoryId);
    return result;
  };

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(categoryId) {
    const result = await findWorksByCondition({
      whereClause: "wk.category_id = $1",
      whereParams: [categoryId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedResults = formatWorksWithNavigation(result);
    return formattedResults;
  };

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(categoryId, workId) {
    const targetWorkId = parseInt(workId, 10);
    const result = await findWorksByCondition({
      whereClause: "wk.category_id = $1",
      whereParams: [categoryId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
    return foundWork;
  };