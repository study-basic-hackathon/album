import { pool } from '../db.js'; 
import { findWorksByCondition } from '../repositories/schemaKeys.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 季節の情報の取得
export async function getSeasonById(req, res) {
  const { seasonId } = req.params;
  try {
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
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
};

// 季節の作品一覧の取得
export async function getSeasonWorks(req, res) {
  const { seasonId } = req.params;
  try {
    if (!seasonId) {
      throw new Error("seasonId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wk.season_id = $1",
      whereParams: [seasonId],
      orderByClause: "wk.created_at ASC"
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
}

// 季節の特定の作品の取得
export async function getSeasonWorkById(req, res) {
  const { seasonId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    if (!seasonId) {
      throw new Error("seasonId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wk.season_id = $1",
      whereParams: [seasonId],
      orderByClause: "wk.created_at ASC"
    });
    if (result.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedWorks = formatWorksWithNavigation(result);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
}