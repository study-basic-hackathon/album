import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

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

