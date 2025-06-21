import { pool } from "../db.js";

// 華展の更新
export async function findPutExhibitions( exhibitionId, name, started_date, ended_date) {
    const result = await pool.query(`
      UPDATE
        exhibition
      SET
        name = $2,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date = $3,
        TO_CHAR(ended_date, 'YYYY-MM-DD') AS ended_date = $4
      WHERE
        id = $1
        `
      [exhibitionId, name, started_date, ended_date]
    );
    return result.rows;
};
