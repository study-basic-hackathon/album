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

//華展の登録
export async function insertExhibition(name, started_name, ended_date) {
  const result = await pool.query(
    `
    INSERT INTO
       exhibition ( name, started_name, ended_date )
     VALUES
       ($1,$2,$3)
     RETURNING
       id
    `,
    [name, started_name, ended_date]
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
      `,
    [exhibitionId, name, started_date, ended_date]
  );
  return result.rows;
};

// 華展の削除
export async function deleteExhibition(exhibitionId) {
  const result = await pool.query(`
    DELETE FROM
      exhibition
    WHERE
      id = $1`,
    [exhibitionId]
  );
  return result.rowCount > 0;
};