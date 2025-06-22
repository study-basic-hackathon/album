import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

export async function findAllExhibitions() {
    const result = await pool.query(`
      SELECT
        id,
        name,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date,
        TO_CHAR(ended_date, 'YYYY-MM-DD') AS ended_date
      FROM
        exhibition
      ORDER BY
        started_date DESC`
    );
    return result.rows;
};

export async function findExhibitionById(exhibitionId) {
    const result = await pool.query(`
      SELECT
        id,
        name,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS started_date,
        TO_CHAR(started_date, 'YYYY-MM-DD') AS ended_date
      FROM
        exhibition
      WHERE
        id = $1`,
      [exhibitionId]
    );
    return result.rows;
};

export async function findWorksByExhibitionId(exhibitionId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.exhibition_id = $1",
    whereParams: [exhibitionId],
    orderByClause: "wk.created_at ASC"
  });
  return result;
};

// 華展の更新
export async function updateExhibition(exhibitionId, name, started_date, ended_date) {
  const result = await pool.query(`
    UPDATE
      exhibition
    SET
      name = $2,
      started_date = $3,
      ended_date = $4
    WHERE
      id = $1
    RETURNING
      *
      `,
    [exhibitionId, name, started_date, ended_date]
  );
  return result.rows;
};