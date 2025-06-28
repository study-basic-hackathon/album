import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

//カテゴリの登録
export async function insertCategory(name) {
  const result = await pool.query(
    `
    INSERT INTO
       category (name)
     VALUES
       ($1)
     RETURNING
       id
    `,
    [name]
  );
  return result.rows;
}

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

// カテゴリの削除
export async function deleteCategory(categoryId) {
  const result = await pool.query(
    `
      DELETE FROM
        category
      WHERE
        id = $1
        `,
    [categoryId]
  );
  return result.rowCount > 0;
}