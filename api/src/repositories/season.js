import { pool } from "../db.js";
import { getFormattedWorkListByCondition } from "./formattedWorkList.js";

//季節の取得
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

//季節の作品の一覧を取得するために値をセット
export async function findWorksBySeasonId(seasonId) {
  const result = await getFormattedWorkListByCondition({
    whereClause: "wk.season_id = $1",
    whereParams: [seasonId],
    orderByClause: "wk.created_at ASC"
  });
  return result;
};