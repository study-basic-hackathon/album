import { pool } from '../db.js'; 
import { findWorksByCondition } from '../repositories/schemaKeys.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 花材の情報の取得
export async function getMaterialById(req, res) {
  const { materialId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        material
      WHERE
        id = $1
        `, 
      [materialId]
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

// 花材の作品一覧の取得
export async function getMaterialWorks(req, res) {
  const { materialId } = req.params;
  try {
    if (!materialId) {
      throw new Error("materialId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wm.material_id = $1",
      whereParams: [materialId],
      orderByClause: "wk.created_at ASC"
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
}

// 花材の特定の作品の取得
export async function getMaterialWorkById(req, res) {
  const { materialId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    if (!materialId) {
      throw new Error("materialId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wm.material_id = $1",
      whereParams: [materialId],
      orderByClause: "wk.created_at ASC"
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    }
    const formattedWorks = formatWorksWithNavigation(result.rows);
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