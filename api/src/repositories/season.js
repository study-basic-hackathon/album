import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

//季節の登録
export async function insertSeason(name) {
  const result = await pool.query(
    `
    INSERT INTO
       seasonS (name)
     VALUES
       ($1)
     RETURNING
       id
    `,
    [name]
  );
  return result.rows;
}

export async function findSeasonById(seasonId) {
  const result = await pool.query(
    `
      SELECT
        *
      FROM
        season
      WHERE
        id = $1
        `,
    [seasonId]
  );
  return result.rows;
}

export async function findWorksBySeasonId(seasonId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.season_id = $1",
    whereParams: [seasonId],
    orderByClause: "wk.created_at ASC",
  });
  return result;
}

// 季節の更新
export async function updateSeason(seasonId, name) {
  const result = await pool.query(
    `
    UPDATE
      season
    SET
      name = $2
    WHERE
      id = $1
    RETURNING
      *
      `,
    [seasonId, name]
  );
  return result.rows;
}

// 季節の削除
export async function deleteSeason(seasonId) {
  const result = await pool.query(
    `
    DELETE FROM
      season
    WHERE
      id = $1
    RETURNING
      *
    `,
    [seasonId]
  );
  return result.rows.length > 0;
}
