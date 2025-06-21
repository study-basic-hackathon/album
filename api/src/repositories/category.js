import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

export async function findCategoryById(categoryId) {
  const result = await pool.query(
    `
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
}

export async function findWorksByCategoryId(categoryId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.category_id = $1",
    whereParams: [categoryId],
    orderByClause: "wk.created_at ASC",
  });
  return result;
}

// カテゴリの更新
export async function updateCategory(categoryId, name) {
  const result = await pool.query(
    `
      UPDATE
        category
      SET
        name = $2
      WHERE
        id = $1
        `,
    [categoryId, name]
  );
  return result.rows;
}
