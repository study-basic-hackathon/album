import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

//花材の取得
export async function findCategoryById(categoryId) {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        category
      WHERE
        id = $1
        `, 
      [categoryId]
    );
    return result.rows;
};

//カテゴリーの作品の一覧を取得するために値をセット
export async function findWorksByCategoryId(categoryId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.category_id = $1",
    whereParams: [categoryId],
    orderByClause: "wk.created_at ASC"
  });
  return result;
};