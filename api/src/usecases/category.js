import { pool } from '../db.js'; 
import { findWorksByCondition } from '../repositories/schemaKeys.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// カテゴリーの情報の取得
export async function getCategoryById(req, res) {
  const { categoryId } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        * 
      FROM
        category
      WHERE
        id = $1
        `, 
      [categoryId]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
};

// カテゴリーの作品一覧の取得
export async function getCategoryWorks(req, res) {
  const { categoryId } = req.params;
  try {
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wk.category_id = $1",
      whereParams: [categoryId],
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

// カテゴリーの特定の作品の取得
export async function getCategoryWorkById(req, res) {
  const { categoryId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    if (!categoryId) {
      throw new Error("categoryId is required");
    }
    const result = await findWorksByCondition({
      whereClause: "wk.category_id = $1",
      whereParams: [categoryId],
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