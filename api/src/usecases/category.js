import { findCategoryById } from '../repositories/index.js';
import { findWorksByCondition } from '../repositories/schemaKeys.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// カテゴリーの情報の取得
export async function getCategoryById(categoryId) {
  try{
    const result = await findCategoryById(categoryId);
    return result;
  } catch (err) {
    console.error("DB Error:", err);
    throw err;
  };
};

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(categoryId) {
  try {
    const result = await findWorksByCondition({
      whereClause: "wk.category_id = $1",
      whereParams: [categoryId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedResults = formatWorksWithNavigation(result);
    return formattedResults;
  } catch (err) {
    console.error("DB Error:", err);
  };
};

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(categoryId, workId) {
  try{
    const targetWorkId = parseInt(workId, 10);
    const result = await findWorksByCondition({
      whereClause: "wk.category_id = $1",
      whereParams: [categoryId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
    return foundWork;
  } catch (err) {
    console.error("DB Error:", err);
  };
};