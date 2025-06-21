import { pool } from "../db.js";

// カテゴリの更新
export async function putCategory(categoryId, name) {
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
