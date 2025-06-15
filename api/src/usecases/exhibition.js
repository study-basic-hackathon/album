import { pool } from '../db.js'; 
import { findWorksByCondition } from '../repositories/schemaKeys.js';
import { formatWorksWithNavigation } from '../repositories/workListItems.js';

// 華展の一覧
export async function getExhibitions(req, res) {
  try {
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
    //ここだけ直接クエリの結果を返しているため。result.rowsになる
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
};

// 華展の取得
export async function getExhibitionById(req, res) {
  const { exhibitionId } = req.params;
  try {
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
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
};

// 華展の作品一覧の取得
export async function getExhibitionWorks(req, res) {
  const { exhibitionId } = req.params;
  try {
    if (!exhibitionId) {
      throw new Error("exhibitionId is required");
    };
    const result = await findWorksByCondition({
      whereClause: "wk.exhibition_id = $1",
      whereParams: [exhibitionId],
      orderByClause: "wk.created_at ASC"
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    const formattedResults = formatWorksWithNavigation(result.rows);
    res.json(formattedResults);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
};


// 華展の特定の作品の取得
export async function getExhibitionWorkById(req, res) {
  const { exhibitionId, workId } = req.params;
  const targetWorkId = parseInt(workId, 10);
  try {
    if (!exhibitionId) {
      throw new Error("exhibitionId is required");
    };
    const result = await findWorksByCondition({
      whereClause: "wk.exhibition_id = $1",
      whereParams: [exhibitionId],
      orderByClause: "wk.created_at ASC"
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Resource not found" });
    };
    const formattedWorks = formatWorksWithNavigation(result.rows);
    const foundWork = formattedWorks.find(item => item.work.id === targetWorkId);
    if (!foundWork) {
      return res.status(404).json({ message: "Resource not found" });
    };
    res.json(foundWork);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database query failed" });
  };
};