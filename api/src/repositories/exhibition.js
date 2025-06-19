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

//華展の作品の一覧を取得するために値をセット
export async function findWorksByExhibitionId(exhibitionId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.exhibition_id = $1",
    whereParams: [exhibitionId],
    orderByClause: "wk.created_at ASC"
  });
  return result;
};