import { findMaterialById, findWorksByCondition } from '../repositories/index.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 花材の情報の取得
export async function getMaterialById(materialId) {
    const result = await findMaterialById(materialId);
    return result;
  };

// 花材の作品一覧の取得
export async function getMaterialWorks(materialId) {
    const result = await findWorksByCondition({
      whereClause: "wm.material_id = $1",
      whereParams: [materialId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedResults = formatWorksWithNavigation(result);
    return formattedResults;
  };

// 花材の特定の作品の取得
export async function getMaterialWorkById(materialId, workId) {
    const targetWorkId = parseInt(workId, 10);
    const result = await findWorksByCondition({
      whereClause: "wm.material_id = $1",
      whereParams: [materialId],
      orderByClause: "wk.created_at ASC"
    });
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.filter(item => item.work.id === targetWorkId);
    return foundWork;
  };