import { pool } from '../db.js'; 
import { findWorksByCondition } from '../repositories/schemaKeys.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 作者の情報の取得
export async function getArrangerById(req, res) {
  const { arrangerId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        arranger
      WHERE
        id = $1
        `, 
      [arrangerId]
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

// 作者の作品一覧の取得
export async function getArrangerWorks(req, res) {
  const { arrangerId } = req.params;
  try {
    if (!arrangerId) {
      throw new Error("arrangerId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wk.arranger_id = $1",
      whereParams: [arrangerId],
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

// 作者の特定の作品の取得
export async function getArrangerWorkById(req, res) {
  const { arrangerId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    if (!arrangerId) {
      throw new Error("arrangerId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wk.arranger_id = $1",
      whereParams: [arrangerId],
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