import { pool } from "../db.js";

// 季節の更新
export async function putSeason(seasonId, name) {
    const result = await pool.query(`
      UPDATE
        season
      SET
        name = $2
      WHERE
        id = $1
        `, 
      [seasonId, name]
    );
    return result.rows;
};
