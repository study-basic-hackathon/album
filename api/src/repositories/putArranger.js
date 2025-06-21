import { pool } from "../db.js";

// 作者の更新
export async function putArranger(arrangerId, name) {
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

