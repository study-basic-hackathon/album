import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

export async function findSeasonById(seasonId) {
    const result = await pool.query(`
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
};

export async function findWorksBySeasonId(seasonId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.season_id = $1",
    whereParams: [seasonId],
    orderByClause: "wk.created_at ASC"
  });
  return result;
};