import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

//作者の登録
export async function insertArranger(name) {
  const result = await pool.query(
    `
    INSERT INTO
       arranger (name)
     VALUES
       ($1)
     RETURNING
       id
    `,
    [name]
  );
  return result.rows;
}

export async function findArrangerById(arrangerId) {
  const result = await pool.query(
    `
      SELECT
        * 
      FROM
        arranger
      WHERE
        id = $1
        `,
    [arrangerId]
  );
  return result.rows;
}

export async function findWorksByArrangerId(arrangerId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.arranger_id = $1",
    whereParams: [arrangerId],
    orderByClause: "wk.created_at ASC",
  });
  return result;
}

// 作者の更新
export async function updateArranger(arrangerId, name) {
  const result = await pool.query(
    `
      UPDATE
        arranger
      SET
        name = $2
      WHERE
        id = $1
        `,
    [arrangerId, name]
  );
  return result.rows;
}

// 作者の削除
export async function deleteArranger(arrangerId) {
  const result = await pool.query(
    `
      DELETE FROM
        arranger
      WHERE
        id = $1
        `,
    [arrangerId]
  );
  return result.rowCount > 0;
}

